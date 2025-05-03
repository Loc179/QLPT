import { Injectable } from '@angular/core';
import { ITenantService } from './tenant.service.interface';

@Injectable({
  providedIn: 'root'
})
export class TenantService implements ITenantService {

  constructor() { }
}
