import { Injectable } from '@angular/core';
import { ISupportrequestService } from './supportrequest.service.interface';
import { Observable } from 'rxjs';
import { SupportRequestModel } from '../../models/supportrequest/supportrequest.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class SupportrequestService implements ISupportrequestService {
  private readonly apiUrl: string = 'http://localhost:5297/api/supportrequest';

  constructor(private readonly httpClient: HttpClient) { }

  reply(id: number, replyContent: string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/reply/${id}`, { id: id, adminReply: replyContent });
  }

  getByUserId(userId: number, status: number | null, page?: number, pageSize?: number): Observable<PaginatedResult<SupportRequestModel>> {
    let params = new HttpParams();
    if (status !== undefined && status !== null) {
      params = params.set('status', status.toString());
    }
    
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<SupportRequestModel>>(`${this.apiUrl}/by-user/${userId}`, {params});
  }
  
  getAll(page?: number, pageSize?: number): Observable<PaginatedResult<SupportRequestModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<SupportRequestModel>>(this.apiUrl, {params});
  }

  getById(id: number): Observable<SupportRequestModel> {
    return this.httpClient.get<SupportRequestModel>(`${this.apiUrl}/${id}`);
  }

  create(data: SupportRequestModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, data);
  }

  update(id: number, data: SupportRequestModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
