import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INVOICE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IInvoiceService } from '../../../../services/invoice/invoice.service.interface';
import { InvoiceListModel } from '../../../../models/invoice/invoicelist.model';
import { RoomServiceModel } from '../../../../models/roomservice/roomservice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {
  public invoice!: InvoiceListModel;
  public services: RoomServiceModel[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(INVOICE_SERVICE) private readonly invoiceService: IInvoiceService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('invoiceId')!;
    this.loadInvoice(id);
  }

  loadInvoice(id: number) {
    this.invoiceService.getById(id).subscribe((data) => {
      this.invoice = data;
    });
  }
  
  goBack() {
    this.router.navigate(['admin/invoice']);
  }
}
