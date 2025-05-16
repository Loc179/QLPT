import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SUPPORTREQUEST_SERVICE } from '../../../../constants/injection/injection.constant';
import { ISupportrequestService } from '../../../../services/supportrequest/supportrequest.service.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supportrequest-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supportrequest-create.component.html',
  styleUrl: './supportrequest-create.component.css'
})
export class SupportrequestCreateComponent {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    @Inject(SUPPORTREQUEST_SERVICE) private readonly supportRequestService: ISupportrequestService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', Validators.required],
      userId: [this.getUserId()] // lấy từ auth/localStorage
    });
  }

  getUserId(): number {
    const userInfoString = localStorage.getItem('userInformation');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      return userInfo.id;
    }
    return 0;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.supportRequestService.create(this.form.value).subscribe({
      next: () => {
        this.toastr.success('Gửi yêu cầu thành công!');
        this.form.reset();
      },
      error: () => {
        this.toastr.error('Đã xảy ra lỗi khi gửi yêu cầu');
      }
    });
  }
}
