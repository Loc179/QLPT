import { Injectable } from '@angular/core';
import { IRoomService } from './room.service.interface';
import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService implements IRoomService {
  private readonly apiUrl: string = 'http://localhost:5297/api/room';

  constructor(private readonly httpClient: HttpClient) { }
  getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<RoomModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<RoomModel>>(`${this.apiUrl}/by-user/${userId}`, {params});
  }

  getAll(page?: number, pageSize?: number): Observable<PaginatedResult<RoomModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<RoomModel>>(this.apiUrl, {params});
  }

  getById(id: number): Observable<RoomModel> {
    return this.httpClient.get<RoomModel>(`${this.apiUrl}/${id}`);
  }

  getByHouseId(houseId: number, page?: number, pageSize?: number): Observable<PaginatedResult<RoomModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    
    return this.httpClient.get<PaginatedResult<RoomModel>>(`${this.apiUrl}/by-house/${houseId}`, {params});
  }

  create(room: RoomModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, room);
  }

  update(id: number, room: RoomModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, room);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
