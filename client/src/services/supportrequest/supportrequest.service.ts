import { Injectable } from '@angular/core';
import { ISupportrequestService } from './supportrequest.service.interface';
import { Observable } from 'rxjs';
import { SupportRequestModel } from '../../models/supportrequest/supportrequest.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupportrequestService implements ISupportrequestService {
  private readonly apiUrl: string = 'http://localhost:5297/api/supportrequest';

  constructor(private readonly httpClient: HttpClient) { }

  reply(id: number, replyContent: string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/reply/${id}`, { id: id, adminReply: replyContent });
  }

  getByUserId(userId: number): Observable<SupportRequestModel[]> {
    return this.httpClient.get<SupportRequestModel[]>(`${this.apiUrl}/by-user/${userId}`);
  }
  
  getAll(): Observable<SupportRequestModel[]> {
    return this.httpClient.get<SupportRequestModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<SupportRequestModel> {
    return this.httpClient.get<SupportRequestModel>(`${this.apiUrl}/${id}`);
  }

  create(data: SupportRequestModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, data);
  }

  update(id: number, data: SupportRequestModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
