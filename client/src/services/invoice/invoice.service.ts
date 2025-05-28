import { Injectable } from '@angular/core';
import { IInvoiceService } from './invoice.service.interface';
import { Observable } from 'rxjs';
import { InvoiceModel } from '../../models/invoice/invoice.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InvoicePaymentModel } from '../../models/invoice/invoicepayment.model';
import { InvoiceListModel } from '../../models/invoice/invoicelist.model';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements IInvoiceService {
private readonly apiUrl: string = 'http://localhost:5297/api/invoice';

  constructor(private readonly httpClient: HttpClient) { }
  
  getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<InvoiceListModel>>(`${this.apiUrl}/by-user/${userId}`, {params});
  }
  
  getPaymentUrl(invoice: InvoicePaymentModel): Observable<{ paymentUrl: string; }> {
    return this.httpClient.post<{ paymentUrl: string; }>(`${this.apiUrl}/paymenturl`, invoice);
  }

  vnpayReturn(queryParams: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/vnpay-return`, queryParams);
  }

  getAll(page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<InvoiceListModel>>(`${this.apiUrl}`, {params});
  }
  
  getById(id: number): Observable<InvoiceListModel> {
    return this.httpClient.get<InvoiceListModel>(`${this.apiUrl}/${id}`);
  }
  
  getByRoomId(roomId: number, page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<InvoiceListModel>>(`${this.apiUrl}/by-room/${roomId}`,{params});
  }

  getByHouseId(houseId: number, page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<InvoiceListModel>>(`${this.apiUrl}/by-house/${houseId}`, {params});
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
  }, page?: number, pageSize?: number): Observable<PaginatedResult<InvoiceListModel>> {
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
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<InvoiceListModel>>(`${this.apiUrl}/search`, { params });
  }

  // Gọi API xuất Excel
  exportToExcel(command: any) {
    return this.httpClient.post(`${this.apiUrl}/export`, command, {
      responseType: 'blob', // cần để xử lý file Excel
    });
  }
}
