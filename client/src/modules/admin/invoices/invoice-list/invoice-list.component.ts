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
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-invoice-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
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
  
  houses: PaginatedResult<HouseModel> | null = null;
  rooms: PaginatedResult<RoomModel> | null = null;
  
  public userId: number | null = null;
  invoices: PaginatedResult<InvoiceListModel> | null = null;

  currentPage: number = 1;
  pageSize: number = 10;

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
    
    this.loadInvoices();

    this.loadHouses();
  }

  loadInvoices(){
    this.invoiceService.getByUserId(this.userId!, this.currentPage, this.pageSize).subscribe({
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
        this.loadInvoices();
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
      isPad: this.selectedIsPad === null ? null : Boolean(this.selectedIsPad)
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

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadInvoices();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadInvoices();
  }
}
