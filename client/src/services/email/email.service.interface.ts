import { EmailModel } from './../../models/email/email.model';
import { Observable } from "rxjs";

export interface IEmailService {
    sendEmail(emailModel: EmailModel): Observable<void>;
}