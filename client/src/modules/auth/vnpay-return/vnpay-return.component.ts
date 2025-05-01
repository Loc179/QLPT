import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH_SERVICE } from '../../../constants/injection/injection.constant';
import { IAuthService } from '../../../services/auth/auth.service.interface';

@Component({
  selector: 'app-vnpay-return',
  templateUrl: './vnpay-return.component.html'
})
export class VnpayReturnComponent implements OnInit {
  statusMessage: string = 'Đang xử lý thanh toán...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    console.log("queryParams", queryParams)

    if (queryParams['vnp_ResponseCode'] === '00') {
      // Giao dịch thành công, xác thực lại với backend
      this.authService.vnpayReturn(queryParams).subscribe({
        next: (response) => {
          if (response) {
            this.statusMessage = 'Thanh toán thành công!';
            setTimeout(() => this.router.navigate(['/login']), 3000);
          } else {
            this.statusMessage = 'Xác nhận thanh toán thất bại!1';
            setTimeout(() => this.router.navigate(['/login']), 3000);
          }
        },
        error: (err) => {
          console.log("Error from BE:", err); // Log lỗi từ backend
          this.statusMessage = 'Xác nhận thanh toán thất bại!2';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        }
      });
      
    } else {
      this.statusMessage = 'Thanh toán thất bại 😢';
    }
  }
}
