import { SimpleLayoutComponent } from './shared/simple-layout/simple-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Routes } from '@angular/router';
import { VnpayReturnComponent } from './auth/vnpay-return/vnpay-return.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';

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
        { path: 'register', component: RegisterComponent }
      ]
    }
];
