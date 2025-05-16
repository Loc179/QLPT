import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SupportRequestModel } from '../../../../models/supportrequest/supportrequest.model';
import { SUPPORTREQUEST_SERVICE } from '../../../../constants/injection/injection.constant';
import { ISupportrequestService } from '../../../../services/supportrequest/supportrequest.service.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supportrequest-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './supportrequest-list.component.html',
  styleUrl: './supportrequest-list.component.css'
})
export class SupportrequestListComponent {
  requests: SupportRequestModel[] = [];

  selectedRequest: SupportRequestModel | null = null;
  isEditModalOpen = false;

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
    this.supportRequestService.getByUserId(userId).subscribe(data => {
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
      this.requests = this.requests.filter(req => req.id !== id);
    });
  }
}
