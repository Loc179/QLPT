import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';
import { ADVERTISEMENT_SERVICE, AUTH_SERVICE, EMAIL_SERVICE, HOUSE_SERVICE, INVOICE_SERVICE, PERMISSION_SERVICE, ROOM_SERVICE, ROOMSERVICE_SERVICE, SERVICEPACKAGE_SERVICE, SUPPORTREQUEST_SERVICE, TENANT_SERVICE, USER_SERVICE } from '../constants/injection/injection.constant';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HouseService } from '../services/house/house.service';
import { InvoiceService } from '../services/invoice/invoice.service';
import { RoomService } from '../services/room/room.service';
import { RoomserviceService } from '../services/roomservice/roomservice.service';
import { SupportrequestService } from '../services/supportrequest/supportrequest.service';
import { TenantService } from '../services/tenant/tenant.service';
import { ServicepackageService } from '../services/servicepackage/servicepackage.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { EmailService } from '../services/email/email.service';
import { UserService } from '../services/user/user.service';
import { AdvertisementService } from '../services/advertisement/advertisement.service';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { PermissionService } from '../services/permission/permission.service';

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
    {
      provide: SERVICEPACKAGE_SERVICE,
      useClass: ServicepackageService,
    },
    {
      provide: EMAIL_SERVICE,
      useClass: EmailService,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: ADVERTISEMENT_SERVICE,
      useClass: AdvertisementService,
    },
    {
      provide: PERMISSION_SERVICE,
      useClass: PermissionService,
    },
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
    ),
    provideAnimations(),
    provideToastr()
  ]
};
