import { Injectable } from '@angular/core';
import { IServicepackageInvoiceService } from './servicepackageinvoice.service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicepackageinvoiceService implements IServicepackageInvoiceService {
  private readonly apiUrl: string = 'http://localhost:5297/api/servicepackageinvoice';

  constructor(private readonly httpClient: HttpClient) { }

  create(queryParams: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, queryParams);
  }
}
