import { InjectionToken } from "@angular/core";
import { IAuthService } from "../../services/auth/auth.service.interface";
import { IHouseService } from "../../services/house/house.service.interface";
import { IInvoiceService } from "../../services/invoice/invoice.service.interface";
import { IRoomService } from "../../services/room/room.service.interface";
import { IRoomserviceService } from "../../services/roomservice/roomservice.service.interface";
import { ISupportrequestService } from "../../services/supportrequest/supportrequest.service.interface";
import { ITenantService } from "../../services/tenant/tenant.service.interface";

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
export const HOUSE_SERVICE = new InjectionToken<IHouseService>('HOUSE_SERVICE');
export const INVOICE_SERVICE = new InjectionToken<IInvoiceService>('INVOICE_SERVICE');
export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');
export const ROOMSERVICE_SERVICE = new InjectionToken<IRoomserviceService>('ROOMSERVICE_SERVICE');
export const SUPPORTREQUEST_SERVICE = new InjectionToken<ISupportrequestService>('SUPPORTREQUEST_SERVICE');
export const TENANT_SERVICE = new InjectionToken<ITenantService>('TENANT_SERVICE');