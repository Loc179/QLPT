import { LocationModel } from './../../../../models/advertisement/location.model';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';
import { ADVERTISEMENT_SERVICE, AUTH_SERVICE, USER_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { CommonModule } from '@angular/common';
import { IUserService } from '../../../../services/user/user.service.interface';
import { IAdvertisementService } from '../../../../services/advertisement/advertisement.service.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-advertisement-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.css']
})
export class AdvertisementCreateComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  form: FormGroup;
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  isLoading = false;
  servicePackageId!: number;
  
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
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
    
  ) {
    this.userService.getById(this.authService.getUserId()).subscribe(user => {
      this.servicePackageId = user.servicePackageId;
    });

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
      images: [[], [Validators.required, Validators.minLength(1)]],
      type: [this.servicePackageId === 3 ? 1 : 2],
      userId: [this.authService.getUserId()]
    });
  }

  ngOnInit(): void {
    // this.initializeMap();
    this.loadProvinces();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoia2RxdWFuZzEyMyIsImEiOiJjbTQ3MTM0MmwwMG4yMmtxdDRobmVyOHVmIn0.hrH5j4eH6vKC0J_godgWWQ';
    
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      center: [105.8542, 21.0285], // Vietnam coordinates
      zoom: 9,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    this.map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      if (!this.marker) {
        this.marker = new mapboxgl.Marker({ color: '#3b82f6' })
          .setLngLat([lng, lat])
          .addTo(this.map);
      } else {
        this.marker.setLngLat([lng, lat]);
      }

      this.form.patchValue({
        longitude: lng,
        latitude: lat
      });
    });
  }

  loadProvinces(): void {
    this.isLoading = true;
    this.http.get<any>(this.API_PROVINCES)
      .subscribe({
        next: (response) => {
            this.locations.provinces = response.data.map((p: any) => ({
            ...p,
            latitude: parseFloat(p.latitude),
            longitude: parseFloat(p.longitude)
          }));
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi tải danh sách tỉnh/thành phố:', err);
          this.isLoading = false;
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
      this.isLoading = true;
      this.http.get<any>(`${this.API_DISTRICTS}${provinceId}.htm`)
        .subscribe({
          next: (response) => {
            this.locations.districts = response.data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Lỗi khi tải danh sách quận/huyện:', err);
            this.isLoading = false;
          }
        });
    }

    // Fly đến vị trí tỉnh
    if (selectedProvince?.latitude && selectedProvince?.longitude) {
      this.map.flyTo({
        center: [selectedProvince.longitude, selectedProvince.latitude],
        zoom: 11 // zoom phù hợp cho tỉnh
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
      this.isLoading = true;
      this.http.get<any>(`${this.API_WARDS}${districtId}.htm`)
        .subscribe({
          next: (response) => {
            this.locations.wards = response.data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Lỗi khi tải danh sách phường/xã:', err);
            this.isLoading = false;
          }
        });
    }

    // Fly đến vị trí huyện
    if (selectedDistrict?.latitude && selectedDistrict?.longitude) {
      this.map.flyTo({
        center: [selectedDistrict.longitude, selectedDistrict.latitude],
        zoom: 13 // zoom phù hợp cho huyện
      });
    }
  }

  onWardChange(): void {
    const wardId = this.form.get('ward')?.value;
    const selectedWard = this.locations.wards.find((w: any) => w.id === wardId);
    this.form.patchValue({ wardName: selectedWard?.name });

    // Fly đến vị trí xã/phường
    if (selectedWard?.latitude && selectedWard?.longitude) {
      this.map.flyTo({
        center: [selectedWard.longitude, selectedWard.latitude],
        zoom: 15 // zoom gần hơn cho xã/phường
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files) as File[];
      this.form.patchValue({ images: files });
    }
  }
  
  removeImage(index: number): void {
    const currentFiles = this.form.get('images')?.value || [];
    const updatedFiles = currentFiles.filter((_: File, i: number) => i !== index);
    this.form.patchValue({ images: updatedFiles });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValue = this.form.value;

    Object.keys(formValue).forEach(key => {
      if (key === 'images') {
        formValue.images.forEach((file: File) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, formValue[key]);
      }
    });

    this.isLoading = true;
    this.advertisementService.create(formData).subscribe({
      next: () => {
        this.toastr.success('Đăng bài thành công!');
        this.form.reset();
        this.form.patchValue({
          type: this.servicePackageId === 3 ? 1 : 2,
          userId: this.authService.getUserInformation(),
        });
        if (this.marker) this.marker.remove();
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.warning('Đã xảy ra lỗi khi đăng bài');
        this.isLoading = false;
      }
    });
  }

}