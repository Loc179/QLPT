import { AdvertisementModel } from './../../models/advertisement/advertisement.model';
import { Injectable } from '@angular/core';
import { IAdvertisementService } from './advertisement.service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService implements IAdvertisementService {
  private readonly apiUrl: string = 'http://localhost:5297/api/advertisement';

  constructor(private readonly httpClient: HttpClient) { }
  
  getAll(): Observable<AdvertisementModel[]> {
    return this.httpClient.get<AdvertisementModel[]>(this.apiUrl);
  }
  
  getById(id: number): Observable<AdvertisementModel> {
    return this.httpClient.get<AdvertisementModel>(`${this.apiUrl}/${id}`);
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
