import { Observable } from "rxjs";
import { InvoiceModel } from "../../models/invoice/invoice.model";
import { InvoicePaymentModel } from "../../models/invoice/invoicepayment.model";
import { InvoiceListModel } from "../../models/invoice/invoicelist.model";

export interface IInvoiceService {
    getAll(): Observable<InvoiceListModel[]>;
    getById(id: number): Observable<InvoiceListModel>;
    getByRoomId(roomId: number): Observable<InvoiceListModel[]>;
    getByUserId(userId: number): Observable<InvoiceListModel[]>;
    getByHouseId(houseId: number): Observable<InvoiceListModel[]>;
    create(invoice: InvoiceModel): Observable<InvoiceModel>;
    update(id: number, invoice: InvoiceModel): Observable<InvoiceModel>;
    delete(id: number): Observable<void>;
    getPaymentUrl(invoice: InvoicePaymentModel): Observable<{ paymentUrl: string }>;
    vnpayReturn(queryParams: any): Observable<any>;
    searchInvoices(filter: any): Observable<InvoiceListModel[]>;
    exportToExcel(command: any): Observable<Blob>;
}