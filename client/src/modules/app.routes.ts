import { SimpleLayoutComponent } from './shared/simple-layout/simple-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Routes } from '@angular/router';
import { VnpayReturnComponent } from './auth/vnpay-return/vnpay-return.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { HouseListComponent } from './admin/houses/house-list/house-list.component';
import { RoomListComponent } from './admin/rooms/room-list/room-list.component';
import { TenantListComponent } from './admin/tenants/tenant-list/tenant-list.component';

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
      path: 'admin',
      component: AdminLayoutComponent,
      children: [
        { path: 'register', component: RegisterComponent },
        { path: 'house', component: HouseListComponent },
        { path: 'room', component: RoomListComponent },
        { path: 'tenant', component: TenantListComponent }
      ]
    }
];
