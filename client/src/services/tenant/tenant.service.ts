import { Injectable } from '@angular/core';
import { ITenantService } from './tenant.service.interface';
import { Observable } from 'rxjs';
import { TenantModel } from '../../models/tenant/tenant.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService implements ITenantService {
  private readonly apiUrl: string = 'http://localhost:5297/api/tenant';

  constructor(private readonly httpClient: HttpClient) { }

  exportToExcel(command: any): Observable<Blob> {
    return this.httpClient.post(`${this.apiUrl}/export`, command, {
      responseType: 'blob'
    });
  }

  getWithoutContract(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<TenantModel>>(`${this.apiUrl}/without-contract/${userId}`, {params});
  }

  search(id: number, keyword: string, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>> {
    let params = new HttpParams().set('keyword', keyword);
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<TenantModel>>(`${this.apiUrl}/search/${id}`, {params});
  }

  getByHouseId(houseId: number, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<TenantModel>>(`${this.apiUrl}/by-house/${houseId}`, {params});
  }
  getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<TenantModel>>(`${this.apiUrl}/by-user/${userId}`, {params});
  }

  getAll(page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<TenantModel>>(this.apiUrl, {params});
  }

  getById(id: number): Observable<TenantModel> {
    return this.httpClient.get<TenantModel>(`${this.apiUrl}/${id}`);
  }

  getByRoomId(roomId: number, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<TenantModel>>(`${this.apiUrl}/by-room/${roomId}`, {params});
  }

  create(data: TenantModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, data);
  }

  update(id: number, data: TenantModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
