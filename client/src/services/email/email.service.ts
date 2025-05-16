import { EmailModel } from './../../models/email/email.model';
import { Injectable } from '@angular/core';
import { IEmailService } from './email.service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService implements IEmailService {
  private readonly apiUrl: string = 'http://localhost:5297/api/email';

  constructor(private readonly httpClient: HttpClient) { }

  sendEmail(emailModel: EmailModel): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/send`, emailModel);
  }
}
