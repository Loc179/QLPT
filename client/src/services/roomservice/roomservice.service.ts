import { Injectable } from '@angular/core';
import { IRoomserviceService } from './roomservice.service.interface';
import { Observable } from 'rxjs';
import { RoomServiceModel } from '../../models/roomservice/roomservice.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomserviceService implements IRoomserviceService {
  private readonly apiUrl: string = 'http://localhost:5297/api/roomservice';

  constructor(private readonly httpClient: HttpClient) { }
  
  getAll(): Observable<RoomServiceModel[]> {
    return this.httpClient.get<RoomServiceModel[]>(this.apiUrl);
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
