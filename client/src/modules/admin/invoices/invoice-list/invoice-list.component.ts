import { Component, Inject } from '@angular/core';
import { InvoiceListModel } from '../../../../models/invoice/invoicelist.model';
import { INVOICE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IInvoiceService } from '../../../../services/invoice/invoice.service.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  imports: [CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent {
  public userId: number | null = null;
  invoices: InvoiceListModel[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(INVOICE_SERVICE) private readonly invoiceService: IInvoiceService
  ) {}

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInformation');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      this.userId = userInfo.id;
    }
    this.invoiceService.getByUserId(this.userId!).subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (err) => {
        console.error('Failed to fetch invoices', err);
      }
    });

  }

  
  deleteInvoice(invoiceId: number) {
    this.invoiceService.delete(invoiceId).subscribe({
      next: () => {
        this.invoices = this.invoices.filter((invoice) => invoice.id !== invoiceId);
      },
      error: (err) => {
        console.error('Failed to delete invoice', err);
      }
    });
  }

  viewInvoice(invoiceId: number) {
    this.router.navigate(['admin/invoice/detail', invoiceId]);
  }
}
