import { IAdvertisementService } from './../../../services/advertisement/advertisement.service.interface';
import { Component, Inject } from '@angular/core';
import { AdvertisementResponseModel } from '../../../models/advertisement/advertisement-response.model';
import { CommonModule } from '@angular/common';
import { ADVERTISEMENT_SERVICE } from '../../../constants/injection/injection.constant';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PaginatedResult } from '../../../models/paginated-result.model';
import { PaginationComponent } from "../../shared/pagination/pagination.component";

@Component({
  selector: 'app-advertisement-manager',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './advertisement-manager.component.html',
  styleUrl: './advertisement-manager.component.css'
})
export class AdvertisementManagerComponent {
  advertisements: PaginatedResult<AdvertisementResponseModel> | null = null;
  selectedImage: string | null = null;

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private readonly toastr: ToastrService,
    private readonly router: Router,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
  ) {  }

  ngOnInit(): void {
    // Dữ liệu mẫu
    this.LoadAdvertisement();
  }

  LoadAdvertisement() {
    this.advertisementService.getByStatus(-1, this.currentPage, this.pageSize).subscribe(res => {
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
  
  selectAd(ad: AdvertisementResponseModel) {
    this.router.navigate(['/webadmin/advertisement/detail', ad.id]);
  }
  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.LoadAdvertisement();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.LoadAdvertisement();
  }

}
