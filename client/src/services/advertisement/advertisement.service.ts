import { Injectable } from '@angular/core';
import { IAdvertisementService } from './advertisement.service.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementResponseModel } from '../../models/advertisement/advertisement-response.model';
import { AdvertisementFilter } from '../../models/advertisement/advertisement-filter.model';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService implements IAdvertisementService {
  private readonly apiUrl: string = 'http://localhost:5297/api/advertisement';

  constructor(private readonly httpClient: HttpClient) { }

  getByFilter(filter: AdvertisementFilter, page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>> {
    let params = new HttpParams();

    if (filter.address) params = params.set('address', filter.address);
    if (filter.areaMin !== undefined) params = params.set('areaMin', filter.areaMin.toString());
    if (filter.areaMax !== undefined) params = params.set('areaMax', filter.areaMax.toString());
    if (filter.priceMin !== undefined) params = params.set('priceMin', filter.priceMin.toString());
    if (filter.priceMax !== undefined) params = params.set('priceMax', filter.priceMax.toString());

    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<AdvertisementResponseModel>>(`${this.apiUrl}/filter`, { params });
  }

  updateStatus(id: number, status: number): Observable<any> {
    return this.httpClient.put<boolean>(`${this.apiUrl}/update-status`, {id, status});
  }

  getByStatus(status: number, page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<AdvertisementResponseModel>>(`${this.apiUrl}/by-status/${status}`, {params});
  }
  getByUserId(id: number, page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<AdvertisementResponseModel>>(`${this.apiUrl}/by-user/${id}`, {params});
  }
  
  getAll(page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<AdvertisementResponseModel>>(this.apiUrl, {params});
  }
  
  getById(id: number): Observable<AdvertisementResponseModel> {
    return this.httpClient.get<AdvertisementResponseModel>(`${this.apiUrl}/${id}`);
  }
  
  create(advertisement: FormData): Observable<any> {
    return this.httpClient.post(this.apiUrl, advertisement);
  }
  
  update(id: number, advertisement: FormData): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, advertisement);
  }
  
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
