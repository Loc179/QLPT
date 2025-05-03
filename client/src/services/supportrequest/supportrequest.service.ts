import { Injectable } from '@angular/core';
import { ISupportrequestService } from './supportrequest.service.interface';

@Injectable({
  providedIn: 'root'
})
export class SupportrequestService implements ISupportrequestService {

  constructor() { }
}
