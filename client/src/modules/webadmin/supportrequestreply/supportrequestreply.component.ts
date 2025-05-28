import { Component, Inject } from '@angular/core';
import { SupportRequestModel } from '../../../models/supportrequest/supportrequest.model';
import { SUPPORTREQUEST_SERVICE } from '../../../constants/injection/injection.constant';
import { ISupportrequestService } from '../../../services/supportrequest/supportrequest.service.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatedResult } from '../../../models/paginated-result.model';
import { PaginationComponent } from "../../shared/pagination/pagination.component";

@Component({
  selector: 'app-supportrequestreply',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './supportrequestreply.component.html',
  styleUrl: './supportrequestreply.component.css'
})
export class SupportrequestreplyComponent {
  requests: PaginatedResult<SupportRequestModel> | null = null;
  selectedRequest: SupportRequestModel | null = null;
  replyContent: string = '';

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    @Inject(SUPPORTREQUEST_SERVICE) private readonly supportRequestService: ISupportrequestService,
  ) {
    this.loadRequests();
  }

  loadRequests() {
    this.supportRequestService.getAll(this.currentPage, this.pageSize).subscribe((data) => {
      this.requests = data;
    });
  }

  selectRequest(req: SupportRequestModel) {
    this.selectedRequest = req;
    this.replyContent = req.adminReply || '';
  }

  sendReply() {
    if (!this.selectedRequest) return;

    this.supportRequestService.reply(this.selectedRequest.id, this.replyContent).subscribe(() => {
      this.selectedRequest!.adminReply = this.replyContent;
      this.selectedRequest!.status = 1; // Đã phản hồi
      this.selectedRequest = null;
      this.replyContent = '';
    });
  }

  cancel() {
    this.selectedRequest = null;
    this.replyContent = '';
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
