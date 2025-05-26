import { Injectable } from '@angular/core';
import { IHouseService } from './house.service.interface';
import { Observable } from 'rxjs';
import { HouseModel } from '../../models/house/house.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseService implements IHouseService {
  private readonly apiUrl: string = 'http://localhost:5297/api/house';

  constructor(private readonly httpClient: HttpClient) { }

  search(id: number, keyword: string): Observable<HouseModel[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.httpClient.get<HouseModel[]>(`${this.apiUrl}/search/${id}`, {params});
  }
  
  getAll(): Observable<HouseModel[]> {
    return this.httpClient.get<HouseModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<HouseModel> {
    return this.httpClient.get<HouseModel>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: number): Observable<HouseModel[]> {
    return this.httpClient.get<HouseModel[]>(`${this.apiUrl}/by-user/${userId}`);
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
