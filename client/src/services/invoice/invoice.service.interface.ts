import { Observable } from "rxjs";
import { InvoiceModel } from "../../models/invoice/invoice.model";
import { InvoicePaymentModel } from "../../models/invoice/invoicepayment.model";
import { InvoiceListModel } from "../../models/invoice/invoicelist.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface IInvoiceService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>>;
    getById(id: number): Observable<InvoiceListModel>;
    getByRoomId(roomId: number, page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>>;
    getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>>;
    getByHouseId(houseId: number, page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>>;
    create(invoice: InvoiceModel): Observable<InvoiceModel>;
    update(id: number, invoice: InvoiceModel): Observable<InvoiceModel>;
    delete(id: number): Observable<void>;
    getPaymentUrl(invoice: InvoicePaymentModel): Observable<{ paymentUrl: string }>;
    vnpayReturn(queryParams: any): Observable<any>;
    searchInvoices(filter: any): Observable<PaginatedResult<InvoiceListModel>>;
    exportToExcel(command: any): Observable<Blob>;
}