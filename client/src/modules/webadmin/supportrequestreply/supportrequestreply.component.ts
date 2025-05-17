import { Component, Inject } from '@angular/core';
import { SupportRequestModel } from '../../../models/supportrequest/supportrequest.model';
import { SUPPORTREQUEST_SERVICE } from '../../../constants/injection/injection.constant';
import { ISupportrequestService } from '../../../services/supportrequest/supportrequest.service.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supportrequestreply',
  imports: [CommonModule, FormsModule],
  templateUrl: './supportrequestreply.component.html',
  styleUrl: './supportrequestreply.component.css'
})
export class SupportrequestreplyComponent {
  requests: SupportRequestModel[] = [];
  selectedRequest: SupportRequestModel | null = null;
  replyContent: string = '';

  constructor(
    @Inject(SUPPORTREQUEST_SERVICE) private readonly supportRequestService: ISupportrequestService,
  ) {
    this.loadRequests();
  }

  loadRequests() {
    this.supportRequestService.getAll().subscribe((data) => {
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
}
