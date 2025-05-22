import { IAdvertisementService } from './../../../services/advertisement/advertisement.service.interface';
import { Component, Inject } from '@angular/core';
import { AdvertisementResponseModel } from '../../../models/advertisement/advertisement-response.model';
import { CommonModule } from '@angular/common';
import { ADVERTISEMENT_SERVICE } from '../../../constants/injection/injection.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-advertisement-manager',
  imports: [CommonModule],
  templateUrl: './advertisement-manager.component.html',
  styleUrl: './advertisement-manager.component.css'
})
export class AdvertisementManagerComponent {
  advertisements: AdvertisementResponseModel[] = [];
  selectedImage: string | null = null;

  constructor(
    private readonly toastr: ToastrService,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
  ) {  }

  ngOnInit(): void {
    // Dữ liệu mẫu
    this.LoadAdvertisement();
  }

  LoadAdvertisement() {
    this.advertisementService.getByStatus(-1).subscribe(res => {
      this.advertisements = res;
    })
  }

  approveAd(adId: number) {
    this.advertisementService.updateStatus(adId, 1).subscribe({
      next: (res) => {
        if(res)
        {
          this.LoadAdvertisement();
          this.toastr.success("Duyệt quảng cáo thành công.");
        }
      },
      error: (error) => {
        this.toastr.warning("Duyệt quảng cáo thất bại");
      }
    })
  }

  rejectAd(adId: number) {
    this.advertisementService.updateStatus(adId, 0).subscribe({
      next: (res) => {
        if(res)
        {
          this.LoadAdvertisement();
          this.toastr.success("Từ chối quảng cáo thành công.");
        }
      },
      error: (error) => {
        this.toastr.warning("Từ chối quảng cáo thất bại");
      }
    })
  }
}
