import { Injectable } from '@angular/core';
import { IRoomService } from './room.service.interface';
import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService implements IRoomService {
  private readonly apiUrl: string = 'http://localhost:5297/api/room';

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<RoomModel[]> {
    return this.httpClient.get<RoomModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<RoomModel> {
    return this.httpClient.get<RoomModel>(`${this.apiUrl}/${id}`);
  }

  getByHouseId(houseId: number): Observable<RoomModel[]> {
    return this.httpClient.get<RoomModel[]>(`${this.apiUrl}/by-house/${houseId}`);
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
