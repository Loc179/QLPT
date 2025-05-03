import { IRoomService } from './../services/room/room.service.interface';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';
import { AUTH_SERVICE, HOUSE_SERVICE, INVOICE_SERVICE, ROOM_SERVICE, ROOMSERVICE_SERVICE, SUPPORTREQUEST_SERVICE, TENANT_SERVICE } from '../constants/injection/injection.constant';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HouseService } from '../services/house/house.service';
import { InvoiceService } from '../services/invoice/invoice.service';
import { RoomService } from '../services/room/room.service';
import { RoomserviceService } from '../services/roomservice/roomservice.service';
import { SupportrequestService } from '../services/supportrequest/supportrequest.service';
import { TenantService } from '../services/tenant/tenant.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: HOUSE_SERVICE,
      useClass: HouseService,
    },
    {
      provide: INVOICE_SERVICE,
      useClass: InvoiceService,
    },
    {
      provide: ROOM_SERVICE,
      useClass: RoomService,
    },
    {
      provide: ROOMSERVICE_SERVICE,
      useClass: RoomserviceService,
    },
    {
      provide: SUPPORTREQUEST_SERVICE,
      useClass: SupportrequestService,
    },
    {
      provide: TENANT_SERVICE,
      useClass: TenantService,
    },
    provideHttpClient(
      withFetch(),
    ),
  ]
};
