import { Injectable } from '@angular/core';
import { IServicepackageService } from './servicepackage.service.interface';
import { Observable } from 'rxjs';
import { ServicePackageModel } from '../../models/servicepackage/servicepackage.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicepackageService implements IServicepackageService {
  private readonly apiUrl: string = 'http://localhost:5297/api/servicepackage';

  constructor(private readonly httpClient: HttpClient) { }
  getAll(): Observable<ServicePackageModel[]> {
    return this.httpClient.get<ServicePackageModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<ServicePackageModel> {
    return this.httpClient.get<ServicePackageModel>(`${this.apiUrl}/${id}`);
  }

  create(data: ServicePackageModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, data);
  }

  update(id: number, data: ServicePackageModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
