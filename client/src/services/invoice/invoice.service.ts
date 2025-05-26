import { Injectable } from '@angular/core';
import { IInvoiceService } from './invoice.service.interface';
import { Observable } from 'rxjs';
import { InvoiceModel } from '../../models/invoice/invoice.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InvoicePaymentModel } from '../../models/invoice/invoicepayment.model';
import { InvoiceListModel } from '../../models/invoice/invoicelist.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements IInvoiceService {
private readonly apiUrl: string = 'http://localhost:5297/api/invoice';

  constructor(private readonly httpClient: HttpClient) { }
  
  getByUserId(userId: number): Observable<InvoiceListModel[]> {
    return this.httpClient.get<InvoiceListModel[]>(`${this.apiUrl}/by-user/${userId}`);
  }
  
  getPaymentUrl(invoice: InvoicePaymentModel): Observable<{ paymentUrl: string; }> {
    return this.httpClient.post<{ paymentUrl: string; }>(`${this.apiUrl}/paymenturl`, invoice);
  }

  vnpayReturn(queryParams: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/vnpay-return`, queryParams);
  }

  getAll(): Observable<InvoiceListModel[]> {
    return this.httpClient.get<InvoiceListModel[]>(`${this.apiUrl}`);
  }
  
  getById(id: number): Observable<InvoiceListModel> {
    return this.httpClient.get<InvoiceListModel>(`${this.apiUrl}/${id}`);
  }
  
  getByRoomId(roomId: number): Observable<InvoiceListModel[]> {
    return this.httpClient.get<InvoiceListModel[]>(`${this.apiUrl}/by-room/${roomId}`);
  }

  getByHouseId(houseId: number): Observable<InvoiceListModel[]> {
    return this.httpClient.get<InvoiceListModel[]>(`${this.apiUrl}/by-house/${houseId}`);
  }

  create(invoice: InvoiceModel): Observable<InvoiceModel> {
    return this.httpClient.post<InvoiceModel>(`${this.apiUrl}`, invoice);
  }
  
  update(id: number, invoice: InvoiceModel): Observable<InvoiceModel> {
    return this.httpClient.put<InvoiceModel>(`${this.apiUrl}/${id}`, invoice);
  }
  
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchInvoices(filter: {
    userId: number;
    keyword?: string;
    isPad?: boolean | null;
    houseId?: number | null;
    fromDate?: number | null;
    toDate?: number | null;
    roomId?: number | null;
  }): Observable<InvoiceListModel[]> {
    let params = new HttpParams()
      .set('userId', filter.userId.toString());

    if (filter.keyword) {
      params = params.set('keyword', filter.keyword);
    }
    if (filter.isPad !== null && filter.isPad !== undefined) {
      params = params.set('isPad', filter.isPad);
    }
    if (filter.houseId) {
      params = params.set('houseId', filter.houseId);
    }
    if (filter.roomId) {
      params = params.set('roomId', filter.roomId);
    }
    if (filter.fromDate) {
      params = params.set('fromDate', filter.fromDate.toString());
    }
    if (filter.toDate) {
      params = params.set('toDate', filter.toDate.toString());
    }

    return this.httpClient.get<InvoiceListModel[]>(`${this.apiUrl}/search`, { params });
  }

  // Gọi API xuất Excel
  exportToExcel(command: any) {
    return this.httpClient.post(`${this.apiUrl}/export`, command, {
      responseType: 'blob', // cần để xử lý file Excel
    });
  }
}
