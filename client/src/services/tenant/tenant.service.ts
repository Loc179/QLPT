import { Injectable } from '@angular/core';
import { ITenantService } from './tenant.service.interface';
import { Observable } from 'rxjs';
import { TenantModel } from '../../models/tenant/tenant.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenantService implements ITenantService {
  private readonly apiUrl: string = 'http://localhost:5297/api/tenant';

  constructor(private readonly httpClient: HttpClient) { }

  search(id: number, keyword: string): Observable<TenantModel[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.httpClient.get<TenantModel[]>(`${this.apiUrl}/search/${id}`, {params});
  }

  getByHouseId(houseId: number): Observable<TenantModel[]> {
    return this.httpClient.get<TenantModel[]>(`${this.apiUrl}/by-house/${houseId}`);
  }
  getByUserId(userId: number): Observable<TenantModel[]> {
    return this.httpClient.get<TenantModel[]>(`${this.apiUrl}/by-user/${userId}`);
  }

  getAll(): Observable<TenantModel[]> {
    return this.httpClient.get<TenantModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<TenantModel> {
    return this.httpClient.get<TenantModel>(`${this.apiUrl}/${id}`);
  }

  getByRoomId(roomId: number): Observable<TenantModel[]> {
    return this.httpClient.get<TenantModel[]>(`${this.apiUrl}/by-room/${roomId}`);
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
