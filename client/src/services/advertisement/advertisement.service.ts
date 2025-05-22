import { AdvertisementModel } from './../../models/advertisement/advertisement.model';
import { Injectable } from '@angular/core';
import { IAdvertisementService } from './advertisement.service.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertisementResponseModel } from '../../models/advertisement/advertisement-response.model';
import { AdvertisementFilter } from '../../models/advertisement/advertisement-filter.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService implements IAdvertisementService {
  private readonly apiUrl: string = 'http://localhost:5297/api/advertisement';

  constructor(private readonly httpClient: HttpClient) { }

  getByFilter(filter: AdvertisementFilter): Observable<AdvertisementResponseModel[]> {
    let params = new HttpParams();

    if (filter.address) params = params.set('address', filter.address);
    if (filter.areaMin !== undefined) params = params.set('areaMin', filter.areaMin.toString());
    if (filter.areaMax !== undefined) params = params.set('areaMax', filter.areaMax.toString());
    if (filter.priceMin !== undefined) params = params.set('priceMin', filter.priceMin.toString());
    if (filter.priceMax !== undefined) params = params.set('priceMax', filter.priceMax.toString());

    return this.httpClient.get<AdvertisementResponseModel[]>(`${this.apiUrl}/filter`, { params });
  }

  updateStatus(id: number, status: number): Observable<any> {
    return this.httpClient.put<boolean>(`${this.apiUrl}/update-status`, {id, status});
  }

  getByStatus(status: number): Observable<AdvertisementResponseModel[]> {
    return this.httpClient.get<AdvertisementResponseModel[]>(`${this.apiUrl}/by-status/${status}`);
  }
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
