import { Injectable } from '@angular/core';
import { IRoomserviceService } from './roomservice.service.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomserviceService implements IRoomserviceService {

  constructor() { }
}
