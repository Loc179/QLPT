import { Injectable } from '@angular/core';
import { IInvoiceService } from './invoice.service.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements IInvoiceService {

  constructor() { }
}
