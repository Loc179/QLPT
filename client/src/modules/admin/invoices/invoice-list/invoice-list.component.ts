import { Component, Inject } from '@angular/core';
import { InvoiceListModel } from '../../../../models/invoice/invoicelist.model';
import { HOUSE_SERVICE, INVOICE_SERVICE, ROOM_SERVICE } from '../../../../constants/injection/injection.constant';
import { IInvoiceService } from '../../../../services/invoice/invoice.service.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HouseModel } from '../../../../models/house/house.model';
import { RoomModel } from '../../../../models/room/room.model';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { IRoomService } from '../../../../services/room/room.service.interface';

@Component({
  selector: 'app-invoice-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent {
  keyword: string = '';
  selectedHouseId: number | null = null;
  selectedRoomId: number | null = null;
  selectedIsPad: boolean | null = null;
  fromDate: Date | null = null;
  toDate: Date | null = null;
  
  houses: HouseModel[] = [];
  rooms: RoomModel[] = [];
  
  public userId: number | null = null;
  invoices: InvoiceListModel[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(INVOICE_SERVICE) private readonly invoiceService: IInvoiceService,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
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

    this.loadHouses();

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

  loadHouses() {
    this.houseService.getByUserId(this.userId!).subscribe(data => {
        this.houses = data;
      });
  }

  onHouseChange() {
    this.selectedRoomId = null;
    if (this.selectedHouseId) {
      this.loadRoomsByHouse(this.selectedHouseId);
    } else {
      this.rooms = [];
    }
  }

  loadRoomsByHouse(houseId: number) {
    this.roomService.getByHouseId(houseId).subscribe(data => {
        this.rooms = data;
      });
  }

  onSearch() {
    const filter = {
      userId: this.userId,
      keyword: this.keyword,
      houseId: this.selectedHouseId,
      roomId: this.selectedRoomId,
      fromDate: this.fromDate,
      toDate: this.toDate,
      isPad: this.selectedIsPad === null ? null : this.selectedIsPad
    };

    this.invoiceService.searchInvoices(filter).subscribe(data => {
      this.invoices = data;
    })

  }

  onExportExcel() {
    const filter = {
      userId: this.userId,
      keyword: this.keyword,
      houseId: this.selectedHouseId,
      roomId: this.selectedRoomId,
      fromDate: this.fromDate,
      toDate: this.toDate,
      isPad: this.selectedIsPad === null ? null : this.selectedIsPad
    };
    this.invoiceService.exportToExcel(filter).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoices_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url); // giải phóng bộ nhớ
      },
      error: (err) => {
        console.error('Export failed:', err);
      }
    });
  }
}
