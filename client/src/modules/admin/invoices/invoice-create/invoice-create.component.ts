import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { InvoiceModel } from '../../../../models/invoice/invoice.model';
import { RoomServiceModel } from '../../../../models/roomservice/roomservice.model';
import { IInvoiceService } from '../../../../services/invoice/invoice.service.interface';
import { EMAIL_SERVICE, INVOICE_SERVICE, ROOM_SERVICE, ROOMSERVICE_SERVICE, TENANT_SERVICE } from '../../../../constants/injection/injection.constant';
import { ToastrService } from 'ngx-toastr';
import { IRoomService } from '../../../../services/room/room.service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoomserviceService } from '../../../../services/roomservice/roomservice.service.interface';
import { RoomModel } from '../../../../models/room/room.model';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';
import { IEmailService } from '../../../../services/email/email.service.interface';
import { EmailModel } from '../../../../models/email/email.model';
import { InvoicePaymentModel } from '../../../../models/invoice/invoicepayment.model';

@Component({
  selector: 'app-invoice-create',
  imports: [CommonModule],
  templateUrl: './invoice-create.component.html',
  styleUrl: './invoice-create.component.css'
})
export class InvoiceCreateComponent {
  roomId!: number;
  roomserviceServices: RoomServiceModel[] = [];
  room!: RoomModel;
  emailModel!: EmailModel;
  tenantCount: number = 0;
  invoicePayment!: InvoicePaymentModel;
  paymentUrl: string = '';

  serviceInputs: { [serviceId: number]: number } = {};
  totalAmount: number = 0;
  isFormValid: boolean = false;

  constructor(
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(INVOICE_SERVICE) private readonly invoiceService: IInvoiceService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(TENANT_SERVICE) private readonly tenantService: ITenantService,
    @Inject(ROOMSERVICE_SERVICE) private readonly roomserviceService: IRoomserviceService,
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = +params['roomId'];
    });

    this.roomserviceService.getByRoomId(this.roomId).subscribe(services => {
      this.roomserviceServices = services;
    });

    this.roomService.getById(this.roomId).subscribe(room => {
      this.room = room;
    });

    this.tenantService.getByRoomId(this.roomId).subscribe(tenants => {
      this.tenantCount = tenants.length;
      console.log("tenantCount: ",this.tenantCount);
    });

  }

  handleInputChange(serviceId: number, value: string): void {
    const parsed = parseFloat(value);
    this.serviceInputs[serviceId] = isNaN(parsed) ? 0 : parsed;
    this.calculateTotal();
  }

  calculateAmount(service: RoomServiceModel): number {
    if (service.unit === 1) return service.cost;
    if (service.unit === 2) return (this.serviceInputs[service.id] || 0) * service.cost;
    if (service.unit === 3) return this.tenantCount * service.cost;
    return 0;
  }

  calculateTotal(): void {
    this.totalAmount = this.room.price + this.roomserviceServices.reduce((acc, service) => acc + this.calculateAmount(service), 0);
    this.isFormValid = this.roomserviceServices.every(service => {
      if (service.unit === 2) {
        return this.serviceInputs[service.id] != null && this.serviceInputs[service.id]! >= 0;
      }
      return true;
    });
  }

  async createInvoice(): Promise<void> {
  if (!this.isFormValid) return;

  const invoice: InvoiceModel = {
    roomId: this.roomId,
    total: this.totalAmount,
    taxRate: 0.1,
    createdAt: new Date(),
    isPaid: false,
    invoiceCode: `INV-${this.roomId}-${new Date().getTime()}`,
    paymentDate: null
  };

  try {
    // Tạo hóa đơn
    const createdInvoice = await this.invoiceService.create(invoice).toPromise();
    console.log('Invoice created:', createdInvoice);

    // Tạo đối tượng thanh toán
    this.invoicePayment = {
      invoiceCode: invoice.invoiceCode,
      total: invoice.total,
      createAt: invoice.createdAt,
      roomId: invoice.roomId
    };

    // Lấy link thanh toán
    this.invoiceService.getPaymentUrl(this.invoicePayment).subscribe({
      next: (response) => {
        console.log('Payment invoice URL:', response);
        this.paymentUrl = response.paymentUrl;
      },
      error: () => {
        this.toastr.error('Lỗi khi lấy link thanh toán.');
      }
    });

    // Gửi email hóa đơn
    this.sendInvoiceEmail(this.paymentUrl);

    // Thực hiện các xử lý khác sau khi có kết quả
    console.log('Payment URL:', this.paymentUrl);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error creating invoice or getting payment URL:', error);
    this.toastr.error('Lỗi khi tạo hóa đơn hoặc lấy link thanh toán.');
  }
}


  sendInvoiceEmail(paymentUrl: string): void {
    // Giả định người đại diện là người đầu tiên trong danh sách (nên được xác định rõ hơn từ backend)
    this.tenantService.getByRoomId(this.roomId).subscribe(tenants => {
      if (tenants.length === 0) return;

      const representative = tenants.find(t => t.isRepresentative === true); // bạn có thể kiểm tra `isRepresentative` nếu có field này
      const email = representative?.email;

      const serviceDetails = this.roomserviceServices.map(service => {
        const amount = this.calculateAmount(service);
        return `${service.name}: ${amount.toLocaleString()} VND`;
      }).join('\n');

      const message = `
        <p>Xin chào <b>${representative?.fullName}</b>,</p>
        <p>Đây là hóa đơn mới cho phòng <strong>${this.room.roomNumber}</strong> của bạn:</p>

        <ul>
          <li>Tiền phòng: ${this.room.price.toLocaleString()} VND</li>
          <li>Dịch vụ:<br>${serviceDetails.replace(/\n/g, '<br>')}</li>
        </ul>

        <p>---------------------</p>
        <p><b>Tổng cộng:</b> ${this.totalAmount.toLocaleString()} VND</p>

        <p>---------------------</p>
        <p><b>Link thanh toán:</b> ${this.paymentUrl}</p>

        <p>Vui lòng thanh toán trong thời gian quy định.</p>
        <p>Trân trọng,<br>Quản lý phòng trọ</p>
        `;


      this.emailModel = {
        email: email ?? '',
        subject: `Hóa đơn phòng ${this.room.roomNumber} của bạn`,
        body: message
      };

      // Gửi email qua một service backend hoặc SMTP
      // Giả định có emailService
      this.emailService.sendEmail(this.emailModel).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Tạo hóa đơn thành công!');
          this.toastr.success('Đã gửi email thông báo.');
        },
        error: (err) => {
          console.error(err);
          console.log('Email sending failed');
          this.toastr.success('Tạo hóa đơn thành công!');
          this.toastr.error('Nhưng gửi email thất bại.');
        }
      });

    });
  }
}