import { Component, Inject } from '@angular/core';
import { SERVICEPACKAGEINVOICE_SERVICE } from '../../../constants/injection/injection.constant';
import { IServicepackageInvoiceService } from '../../../services/servicepackageinvoice/servicepackageinvoice.service.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servicepackageinvoice',
  imports: [],
  templateUrl: './servicepackageinvoice.component.html',
  styleUrl: './servicepackageinvoice.component.css'
})
export class ServicepackageinvoiceComponent {
  statusMessage: string = 'Đang xử lý thanh toán...';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(SERVICEPACKAGEINVOICE_SERVICE) private readonly servicepackageinvoiceService: IServicepackageInvoiceService,
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    console.log("queryParams", queryParams)

    if (queryParams['vnp_ResponseCode'] === '00') {
      // Giao dịch thành công, xác thực lại với backend
      this.servicepackageinvoiceService.create(queryParams).subscribe({
        next: (response) => {
          if (response) {
            this.statusMessage = 'Thanh toán thành công!';
            setTimeout(() => this.router.navigate(['/login']), 3000);
          } else {
            this.statusMessage = 'Xác nhận thanh toán thất bại!';
            setTimeout(() => this.router.navigate(['/login']), 30000);
          }
        },
        error: (err) => {
          console.log("Error from BE:", err); // Log lỗi từ backend
          this.statusMessage = 'Xác nhận thanh toán thất bại!';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        }
      });
      
    } else {
      this.statusMessage = 'Thanh toán thất bại 😢';
    }
  }
}
