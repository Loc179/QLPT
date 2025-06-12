import { Component, Inject } from '@angular/core';
import { IInvoiceService } from '../../../../services/invoice/invoice.service.interface';
import { INVOICE_SERVICE } from '../../../../constants/injection/injection.constant';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice-update-status',
  imports: [],
  templateUrl: './invoice-update-status.component.html',
  styleUrl: './invoice-update-status.component.css'
})
export class InvoiceUpdateStatusComponent {
  statusMessage: string = 'Đang xử lý thanh toán...';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastr : ToastrService,
    @Inject(INVOICE_SERVICE) private readonly invoiceService: IInvoiceService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['vnp_ResponseCode']) {
        this.invoiceService.vnpayReturn(params).subscribe({
        next: (response) => {
          console.log("response", response);
          if (response) {
            this.statusMessage = 'Thanh toán thành công!';
            this.toastr.success(this.statusMessage);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          } else {
            this.statusMessage = 'Xác nhận thanh toán thất bại!1';
            this.toastr.error(this.statusMessage);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          }
        },
        error: (err) => {
          console.log("Error from BE:", err); // Log lỗi từ backend
          this.statusMessage = 'Xác nhận thanh toán thất bại!2';
          this.toastr.error(this.statusMessage);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }
      });
      }
    });
      
      
    }
}
