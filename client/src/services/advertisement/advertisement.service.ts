import { AdvertisementModel } from './../../models/advertisement/advertisement.model';
import { Injectable } from '@angular/core';
import { IAdvertisementService } from './advertisement.service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementResponseModel } from '../../models/advertisement/advertisement-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService implements IAdvertisementService {
  private readonly apiUrl: string = 'http://localhost:5297/api/advertisement';

  constructor(private readonly httpClient: HttpClient) { }
  getByUserId(id: number): Observable<AdvertisementResponseModel[]> {
    return this.httpClient.get<AdvertisementResponseModel[]>(`${this.apiUrl}/by-user/${id}`);
  }
  
  getAll(): Observable<AdvertisementResponseModel[]> {
    return this.httpClient.get<AdvertisementResponseModel[]>(this.apiUrl);
  }
  
  getById(id: number): Observable<AdvertisementResponseModel> {
    return this.httpClient.get<AdvertisementResponseModel>(`${this.apiUrl}/${id}`);
  }
  
  create(advertisement: FormData): Observable<any> {
    return this.httpClient.post(this.apiUrl, advertisement);
  }
  
  update(id: number, advertisement: AdvertisementModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, advertisement);
  }
  
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
