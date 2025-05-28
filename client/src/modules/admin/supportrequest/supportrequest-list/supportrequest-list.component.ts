import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SupportRequestModel } from '../../../../models/supportrequest/supportrequest.model';
import { SUPPORTREQUEST_SERVICE } from '../../../../constants/injection/injection.constant';
import { ISupportrequestService } from '../../../../services/supportrequest/supportrequest.service.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-supportrequest-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './supportrequest-list.component.html',
  styleUrl: './supportrequest-list.component.css'
})
export class SupportrequestListComponent {
  requests: PaginatedResult<SupportRequestModel> | null = null;

  selectedRequest: SupportRequestModel | null = null;
  filterStatus: number | null = null
  isEditModalOpen = false;

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private readonly router: Router,
    @Inject(SUPPORTREQUEST_SERVICE) private readonly supportRequestService: ISupportrequestService,
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }


  openEditModal(request: SupportRequestModel) {
    this.selectedRequest = { ...request }; // clone để không sửa trực tiếp
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedRequest = null;
  }

  saveEdit() {
    if (!this.selectedRequest) return;

    // Gọi API để cập nhật (ví dụ)
    this.supportRequestService.update(this.selectedRequest.id, this.selectedRequest).subscribe(() => {
      // Reload lại danh sách
      this.loadRequests();
      this.closeEditModal();
    });
  }

  loadRequests() {
    const userId = this.getUserId();
    this.supportRequestService.getByUserId(userId, this.filterStatus, this.currentPage, this.pageSize).subscribe(data => {
      this.requests = data;
    });
  }

  getUserId(): number {
    const userInfoString = localStorage.getItem('userInformation');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      const userId = userInfo.id;
      return userId;
    }
    return 0;
  }

  createNewRequest() {
    this.router.navigate(['admin/support/create']);
  }

  
  editRequest(id: number) {
    this.router.navigate(['/admin/support/edit', id]);
  }

  deleteRequest(id: number) {
    this.supportRequestService.delete(id).subscribe(() => {
      this.loadRequests();
    });
  }

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadRequests();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadRequests();
  }
}
