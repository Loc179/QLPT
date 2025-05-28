import { Injectable } from '@angular/core';
import { IRoomserviceService } from './roomservice.service.interface';
import { Observable } from 'rxjs';
import { RoomServiceModel } from '../../models/roomservice/roomservice.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class RoomserviceService implements IRoomserviceService {
  private readonly apiUrl: string = 'http://localhost:5297/api/roomservice';

  constructor(private readonly httpClient: HttpClient) { }

  getByRoomId(roomId: number, page?: number, pageSize?: number): Observable<PaginatedResult<RoomServiceModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<RoomServiceModel>>(`${this.apiUrl}/by-room/${roomId}`, {params});
  }
  
  getAll(page?: number, pageSize?: number): Observable<PaginatedResult<RoomServiceModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.httpClient.get<PaginatedResult<RoomServiceModel>>(this.apiUrl, {params});
  }

  getById(id: number): Observable<RoomServiceModel> {
    return this.httpClient.get<RoomServiceModel>(`${this.apiUrl}/${id}`);
  }

  create(service: RoomServiceModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, service);
  }

  update(id: number, service: RoomServiceModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, service);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
