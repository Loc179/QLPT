import { LocationModel } from './../../../../models/advertisement/location.model';
import { AdvertisementResponseModel } from './../../../../models/advertisement/advertisement-response.model';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import { ADVERTISEMENT_SERVICE, AUTH_SERVICE, USER_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { CommonModule } from '@angular/common';
import { IUserService } from '../../../../services/user/user.service.interface';
import { IAdvertisementService } from '../../../../services/advertisement/advertisement.service.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-advertisement-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './advertisement-edit.component.html',
  styleUrls: ['./advertisement-edit.component.css']
})
export class AdvertisementEditComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  form: FormGroup;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  isLoading = false;
  isSubmitting = false;
  advertisementId!: number;
  currentAdvertisement!: AdvertisementResponseModel;
  currentImages: string[] = [];
  removedImageIndexes: number[] = [];
  
  // Vietnamese location API endpoints
  private readonly API_PROVINCES = 'https://esgoo.net/api-tinhthanh/1/0.htm';
  private readonly API_DISTRICTS = 'https://esgoo.net/api-tinhthanh/2/';
  private readonly API_WARDS = 'https://esgoo.net/api-tinhthanh/3/';

  locations: {
    provinces: LocationModel[],
    districts: LocationModel[],
    wards: LocationModel[]
  } = {
    provinces: [],
    districts: [],
    wards: []
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1000)],
      cost: ['', [Validators.required, Validators.min(0)]],
      area: ['', [Validators.required, Validators.min(0)]],
      maxOccupants: ['', [Validators.required, Validators.min(0)]],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      provinceName: [''],
      districtName: [''],
      wardName: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      images: [[]],
      type: [''],
      userId: [this.authService.getUserId()]
    });
  }

  ngOnInit(): void {
    this.advertisementId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProvinces();
    this.loadAdvertisement();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  ngAfterViewInit(): void {
    // Map will be initialized after data is loaded
  }

  loadAdvertisement(): void {
    this.isLoading = true;
    this.advertisementService.getById(this.advertisementId).subscribe({
      next: (ad) => {
        this.currentAdvertisement = ad;
        this.currentImages = ad.imagesPath || [];
        this.populateForm(ad);
        this.isLoading = false;
        
        // Initialize map after data is loaded
        setTimeout(() => {
          if (this.mapContainer) {
            this.initializeMap();
          }
        }, 100);
      },
      error: (err) => {
        this.toastr.error('Không thể tải thông tin quảng cáo');
        this.router.navigate(['/advertisements']);
        this.isLoading = false;
      }
    });
  }

  populateForm(ad: AdvertisementResponseModel): void {
    // Parse address to get location parts
    const addressParts = this.parseAddress(ad.address);
    
    this.form.patchValue({
      title: ad.title,
      description: ad.description,
      cost: ad.cost,
      area: ad.area,
      maxOccupants: ad.maxOccupants,
      latitude: ad.latitude,
      longitude: ad.longitude,
      type: ad.type,
      wardName: addressParts.ward,
      districtName: addressParts.district,
      provinceName: addressParts.province
    });

    // Load location hierarchically
    this.loadLocationHierarchy(addressParts);
  }

  parseAddress(address: string): { ward: string, district: string, province: string } {
    const parts = address.split(', ');
    return {
      ward: parts[0] || '',
      district: parts[1] || '',
      province: parts[2] || ''
    };
  }

  async loadLocationHierarchy(addressParts: { ward: string, district: string, province: string }): Promise<void> {
    // First, wait for provinces to load if not already loaded
    if (this.locations.provinces.length === 0) {
      await new Promise(resolve => {
        const checkProvinces = () => {
          if (this.locations.provinces.length > 0) {
            resolve(true);
          } else {
            setTimeout(checkProvinces, 100);
          }
        };
        checkProvinces();
      });
    }

    // Find and set province
    const province = this.locations.provinces.find(p => p.name === addressParts.province);
    if (province) {
      this.form.patchValue({ 
        province: province.id,
        provinceName: province.name 
      });

      // Load districts
      await this.loadDistrictsForProvince(province.id.toString());
      
      // Find and set district
      const district = this.locations.districts.find(d => d.name === addressParts.district);
      if (district) {
        this.form.patchValue({ 
          district: district.id,
          districtName: district.name 
        });

        // Load wards
        await this.loadWardsForDistrict(district.id.toString());

        // Find and set ward
        const ward = this.locations.wards.find(w => w.name === addressParts.ward);
        if (ward) {
          this.form.patchValue({ 
            ward: ward.id,
            wardName: ward.name 
          });
        }
      }
    }
  }

  loadDistrictsForProvince(provinceId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.API_DISTRICTS}${provinceId}.htm`)
        .subscribe({
          next: (response) => {
            this.locations.districts = response.data;
            resolve();
          },
          error: (err) => {
            console.error('Lỗi khi tải danh sách quận/huyện:', err);
            reject(err);
          }
        });
    });
  }

  loadWardsForDistrict(districtId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.API_WARDS}${districtId}.htm`)
        .subscribe({
          next: (response) => {
            this.locations.wards = response.data;
            resolve();
          },
          error: (err) => {
            console.error('Lỗi khi tải danh sách phường/xã:', err);
            reject(err);
          }
        });
    });
  }

  initializeMap(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoia2RxdWFuZzEyMyIsImEiOiJjbTQ3MTM0MmwwMG4yMmtxdDRobmVyOHVmIn0.hrH5j4eH6vKC0J_godgWWQ';
    
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      center: [this.currentAdvertisement.longitude, this.currentAdvertisement.latitude],
      zoom: 15,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add existing marker
    this.marker = new mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat([this.currentAdvertisement.longitude, this.currentAdvertisement.latitude])
      .addTo(this.map);

    this.map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      this.marker.setLngLat([lng, lat]);
      this.form.patchValue({
        longitude: lng,
        latitude: lat
      });
    });
  }

  loadProvinces(): void {
    this.http.get<any>(this.API_PROVINCES)
      .subscribe({
        next: (response) => {
          this.locations.provinces = response.data.map((p: any) => ({
            ...p,
            latitude: parseFloat(p.latitude),
            longitude: parseFloat(p.longitude)
          }));
        },
        error: (err) => {
          console.error('Lỗi khi tải danh sách tỉnh/thành phố:', err);
        }
      });
  }

  onProvinceChange(): void {
    const provinceId = this.form.get('province')?.value;
    const selectedProvince = this.locations.provinces.find((p: any) => p.id === provinceId);
    
    this.form.patchValue({
      provinceName: selectedProvince?.name,
      district: '',
      districtName: '',
      ward: '',
      wardName: ''
    });

    this.locations.districts = [];
    this.locations.wards = [];

    if (provinceId) {
      this.loadDistrictsForProvince(provinceId);
    }

    // Fly to province location
    if (selectedProvince?.latitude && selectedProvince?.longitude && this.map) {
      this.map.flyTo({
        center: [selectedProvince.longitude, selectedProvince.latitude],
        zoom: 11
      });
    }
  }

  onDistrictChange(): void {
    const districtId = this.form.get('district')?.value;
    const selectedDistrict = this.locations.districts.find((d: any) => d.id === districtId);
    
    this.form.patchValue({
      districtName: selectedDistrict?.name,
      ward: '',
      wardName: ''
    });

    this.locations.wards = [];

    if (districtId) {
      this.loadWardsForDistrict(districtId);
    }

    // Fly to district location
    if (selectedDistrict?.latitude && selectedDistrict?.longitude && this.map) {
      this.map.flyTo({
        center: [selectedDistrict.longitude, selectedDistrict.latitude],
        zoom: 13
      });
    }
  }

  onWardChange(): void {
    const wardId = this.form.get('ward')?.value;
    const selectedWard = this.locations.wards.find((w: any) => w.id === wardId);
    this.form.patchValue({ wardName: selectedWard?.name });

    // Fly to ward location
    if (selectedWard?.latitude && selectedWard?.longitude && this.map) {
      this.map.flyTo({
        center: [selectedWard.longitude, selectedWard.latitude],
        zoom: 15
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files) as File[];
      this.form.patchValue({ images: files });
    }
  }
  
  removeNewImage(index: number): void {
    const currentFiles = this.form.get('images')?.value || [];
    const updatedFiles = currentFiles.filter((_: File, i: number) => i !== index);
    this.form.patchValue({ images: updatedFiles });
  }

  removeCurrentImage(index: number): void {
    this.removedImageIndexes.push(index);
    this.currentImages = this.currentImages.filter((_, i) => i !== index);
  }

  onCancel(): void {
    this.router.navigate(['/advertisements']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Check if we have at least one image (current or new)
    const hasCurrentImages = this.currentImages.length > 0;
    const hasNewImages = this.form.get('images')?.value?.length > 0;
    
    if (!hasCurrentImages && !hasNewImages) {
      this.toastr.warning('Vui lòng thêm ít nhất một ảnh');
      return;
    }

    const formData = new FormData();
    const formValue = this.form.value;

    // Add basic form data
    Object.keys(formValue).forEach(key => {
      if (key === 'images') {
        // Add new images
        if (formValue.images && formValue.images.length > 0) {
          formValue.images.forEach((file: File) => {
            formData.append('images', file);
          });
        }
      } else {
        formData.append(key, formValue[key]);
      }
    });

    // Add advertisement ID
    formData.append('id', this.advertisementId.toString());

    // Add removed image indexes
    if (this.removedImageIndexes.length > 0) {
      formData.append('removedImageIndexes', JSON.stringify(this.removedImageIndexes));
    }

    this.isSubmitting = true;
    this.advertisementService.update(this.advertisementId, formData).subscribe({
      next: () => {
        this.toastr.success('Cập nhật quảng cáo thành công!');
        this.router.navigate(['/admin/advertisement']);
      },
      error: (err) => {
        this.toastr.error('Đã xảy ra lỗi khi cập nhật quảng cáo');
        this.isSubmitting = false;
      }
    });
  }
}