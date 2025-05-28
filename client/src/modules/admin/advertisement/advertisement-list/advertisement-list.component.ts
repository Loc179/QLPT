import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { Router } from '@angular/router';
import { ADVERTISEMENT_SERVICE, AUTH_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAdvertisementService } from '../../../../services/advertisement/advertisement.service.interface';
import { FormsModule } from '@angular/forms';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-advertisement-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './advertisement-list.component.html',
  styleUrl: './advertisement-list.component.css'
})
export class AdvertisementListComponent {
  advertisements: PaginatedResult<AdvertisementResponseModel> | null = null;
  selectedStatus: number | null = null;

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private readonly router: Router,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { }

  ngOnInit(): void {
    this.loadAdvertisement();
  }

  loadAdvertisement() {
    this.advertisementService.getByUserId(this.authService.getUserId(), this.currentPage, this.pageSize).subscribe(data => {
      this.advertisements = data;
    })
  }

  view(id: number) {
    this.router.navigate(['/admin/advertisement/detail', id]);
  }

  edit(id: number) {
    this.router.navigate(['/admin/advertisement/edit', id]);
  }

  delete(id: number) {
    this.advertisementService.delete(id).subscribe(() => {
      this.loadAdvertisement();
    })
  }
  
  createNew() {
    this.router.navigate(['/admin/advertisement/create']);
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1: return 'Đã duyệt';
      case 0: return 'Chờ duyệt';
      case -1: return 'Đã ẩn';
      default: return 'Không xác định';
    }
  }

  filterByStatus() {
    if(this.selectedStatus == null)
    {
      this.loadAdvertisement();
    } else {
      this.advertisementService.getByStatus(this.selectedStatus).subscribe(data => {
        this.advertisements = data;
      })
    }
  }

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadAdvertisement();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadAdvertisement();
  }
}
