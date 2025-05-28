import { Injectable } from '@angular/core';
import { IHouseService } from './house.service.interface';
import { Observable } from 'rxjs';
import { HouseModel } from '../../models/house/house.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService implements IHouseService {
  private readonly apiUrl: string = 'http://localhost:5297/api/house';

  constructor(private readonly httpClient: HttpClient) { }

  search(id: number, keyword: string, page?: number, pageSize?: number): Observable<PaginatedResult<HouseModel>> {
    let params = new HttpParams()
      .set('keyword', keyword);
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<HouseModel>>(`${this.apiUrl}/search/${id}`, {params});
  }
  
  getAll(page?: number, pageSize?: number): Observable<PaginatedResult<HouseModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<HouseModel>>(this.apiUrl, {params});
  }

  getById(id: number): Observable<HouseModel> {
    return this.httpClient.get<HouseModel>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<HouseModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<HouseModel>>(`${this.apiUrl}/by-user/${userId}`, {params});
  }

  create(house: HouseModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, house);
  }

  update(id: number, house: HouseModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, house);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
