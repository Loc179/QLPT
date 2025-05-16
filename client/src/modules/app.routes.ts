import { SimpleLayoutComponent } from './shared/simple-layout/simple-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Routes } from '@angular/router';
import { VnpayReturnComponent } from './auth/vnpay-return/vnpay-return.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { HouseListComponent } from './admin/houses/house-list/house-list.component';
import { RoomListComponent } from './admin/rooms/room-list/room-list.component';
import { TenantListComponent } from './admin/tenants/tenant-list/tenant-list.component';
import { TenantCreateComponent } from './admin/tenants/tenant-create/tenant-create.component';
import { HouseCreateComponent } from './admin/houses/house-create/house-create.component';
import { RoomCreateComponent } from './admin/rooms/room-create/room-create.component';
import { TenantEditComponent } from './admin/tenants/tenant-edit/tenant-edit.component';
import { HouseEditComponent } from './admin/houses/house-edit/house-edit.component';
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { HouseDetailComponent } from './admin/houses/house-detail/house-detail.component';
import { RoomservicesListComponent } from './admin/roomservices/roomservices-list/roomservices-list.component';
import { RoomservicesCreateComponent } from './admin/roomservices/roomservices-create/roomservices-create.component';
import { InvoiceCreateComponent } from './admin/invoices/invoice-create/invoice-create.component';
import { InvoiceUpdateStatusComponent } from './admin/invoices/invoice-update-status/invoice-update-status.component';
import { InvoiceListComponent } from './admin/invoices/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './admin/invoices/invoice-detail/invoice-detail.component';
import { SupportrequestCreateComponent } from './admin/supportrequest/supportrequest-create/supportrequest-create.component';
import { SupportrequestListComponent } from './admin/supportrequest/supportrequest-list/supportrequest-list.component';
import { SupportrequestEditComponent } from './admin/supportrequest/supportrequest-edit/supportrequest-edit.component';
import { UserManagerComponent } from './webadmin/user-manager/user-manager.component';
import { UserDetailComponent } from './webadmin/user-detail/user-detail.component';
import { AdvertisementCreateComponent } from './admin/advertisement/advertisement-create/advertisement-create.component';
import { AdvertisementListComponent } from './admin/advertisement/advertisement-list/advertisement-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
          { path: 'register', component: RegisterComponent },
          { path: 'login', component: LoginComponent },
          { path: 'vnpay-return', component: VnpayReturnComponent }
        ]
    },

    {
        path: 'webadmin',
        component: AdminLayoutComponent,
        children: [
          { path: 'user-manager', component: UserManagerComponent },
          { path: 'user-detail/:id', component: UserDetailComponent },
        ]
    },

    {
      path: 'admin',
      component: AdminLayoutComponent,
      children: [
        { path: 'advertisement', component: AdvertisementListComponent },
        { path: 'advertisement/create', component: AdvertisementCreateComponent },
        { path: 'house/create', component: HouseCreateComponent },
        { path: 'house/edit/:houseId', component: HouseEditComponent },
        { path: 'house/detail/:houseId', component: HouseDetailComponent },
        { path: 'house/:userId', component: HouseListComponent },
        { path: 'room/create', component: RoomCreateComponent },
        { path: 'room/edit/:roomId', component: RoomEditComponent },
        { path: 'room/detail/:roomId', component: RoomDetailComponent },
        { path: 'room/:houseId', component: RoomListComponent },
        { path: 'roomAll/:userId', component: RoomListComponent },
        { path: 'roomservice/:roomId', component: RoomservicesListComponent },
        { path: 'roomservice/create/:roomId', component: RoomservicesCreateComponent },
        { path: 'tenant/room/:roomId', component: TenantListComponent },
        { path: 'tenant/house/:houseId', component: TenantListComponent },
        { path: 'tenant/user/:userId', component: TenantListComponent },
        { path: 'tenant/create/:roomId', component: TenantCreateComponent },
        { path: 'tenant/edit/:tenantId', component: TenantEditComponent },
        { path: 'invoice', component: InvoiceListComponent },
        { path: 'invoice/create/:roomId', component: InvoiceCreateComponent },
        { path: 'invoice/detail/:invoiceId', component: InvoiceDetailComponent },
        { path: 'invoice/vnpay-return', component: InvoiceUpdateStatusComponent },
        { path: 'support', component: SupportrequestListComponent },
        { path: 'support/create', component: SupportrequestCreateComponent },
        { path: 'support/edit/:id', component: SupportrequestEditComponent },

      ]
    }
];
