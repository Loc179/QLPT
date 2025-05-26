import { AdvertisementDetailComponent } from './public/advertisement/advertisement-detail/advertisement-detail.component';
import { DetailComponent } from './advertisement/detail/detail.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SimpleLayoutComponent } from './shared/simple-layout/simple-layout.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      { 
        path: 'home', 
        loadComponent: () => import('./public/home/home/home.component').then(m => m.HomeComponent) 
      },
      { 
        path: 'price', 
        loadComponent: () => import('./public/price-list/price-list.component').then(m => m.PriceListComponent) 
      },
      { 
        path: 'filter', 
        loadComponent: () => import('./public/advertisement/advertisement-home/advertisement-home.component').then(m => m.AdvertisementHomeComponent) 
      },
      { 
        path: 'saved', 
        loadComponent: () => import('./public/advertisement/saved-advertisement/saved-advertisement.component').then(m => m.SavedAdvertisementComponent) 
      },
      { 
        path: 'advertisement/:id', 
        loadComponent: () => import('./advertisement/detail/detail.component').then(m => m.DetailComponent) 
      },
      { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) 
      },
      { 
        path: 'register', 
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) 
      },
      { 
        path: 'vnpay-return', 
        loadComponent: () => import('./auth/vnpay-return/vnpay-return.component').then(m => m.VnpayReturnComponent) 
      },
      { 
        path: 'invoice/vnpay-return', 
        loadComponent: () => import('./admin/invoices/invoice-update-status/invoice-update-status.component').then(m => m.InvoiceUpdateStatusComponent) 
      },
      { 
        path: 'vipcard', 
        loadComponent: () => import('./shared/cards/vip-card/vip-card.component').then(m => m.VipCardComponent) 
      },
      { 
        path: 'normalcard', 
        loadComponent: () => import('./shared/cards/normal-card/normal-card.component').then(m => m.NormalCardComponent) 
      }
    ]
  },

  {
    path: 'webadmin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'advertisement-management', 
        loadComponent: () => import('./webadmin/advertisement-manager/advertisement-manager.component').then(m => m.AdvertisementManagerComponent) 
      },
      { 
        path: 'servicepackage', 
        loadComponent: () => import('./webadmin/servicepackage/servicepackage.component').then(m => m.ServicepackageComponent) 
      },
      { 
        path: 'supportrequest', 
        loadComponent: () => import('./webadmin/supportrequestreply/supportrequestreply.component').then(m => m.SupportrequestreplyComponent) 
      },
      { 
        path: 'user-management', 
        loadComponent: () => import('./webadmin/user-manager/user-manager.component').then(m => m.UserManagerComponent) 
      },
      { 
        path: 'user-detail/:id', 
        loadComponent: () => import('./webadmin/user-detail/user-detail.component').then(m => m.UserDetailComponent) 
      }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'advertisement', 
        loadComponent: () => import('./admin/advertisement/advertisement-list/advertisement-list.component').then(m => m.AdvertisementListComponent) 
      },
      { 
        path: 'advertisement/create', 
        loadComponent: () => import('./admin/advertisement/advertisement-create/advertisement-create.component').then(m => m.AdvertisementCreateComponent) 
      },
      { 
        path: 'advertisement/edit/:id', 
        loadComponent: () => import('./admin/advertisement/advertisement-edit/advertisement-edit.component').then(m => m.AdvertisementEditComponent) 
      },
      { 
        path: 'advertisement/detail/:id', 
        loadComponent: () => import('./admin/advertisement/advertisement-detail/advertisement-detail.component').then(m => m.AdvertisementDetailComponent) 
      },

      // House Routes
      { 
        path: 'house/create', 
        loadComponent: () => import('./admin/houses/house-create/house-create.component').then(m => m.HouseCreateComponent) 
      },
      { 
        path: 'house/edit/:houseId', 
        loadComponent: () => import('./admin/houses/house-edit/house-edit.component').then(m => m.HouseEditComponent) 
      },
      { 
        path: 'house/detail/:houseId', 
        loadComponent: () => import('./admin/houses/house-detail/house-detail.component').then(m => m.HouseDetailComponent) 
      },
      { 
        path: 'house/:userId', 
        loadComponent: () => import('./admin/houses/house-list/house-list.component').then(m => m.HouseListComponent) 
      },

      // Room Routes
      { 
        path: 'room/create', 
        loadComponent: () => import('./admin/rooms/room-create/room-create.component').then(m => m.RoomCreateComponent) 
      },
      { 
        path: 'room/edit/:roomId', 
        loadComponent: () => import('./admin/rooms/room-edit/room-edit.component').then(m => m.RoomEditComponent) 
      },
      { 
        path: 'room/detail/:roomId', 
        loadComponent: () => import('./admin/rooms/room-detail/room-detail.component').then(m => m.RoomDetailComponent) 
      },
      { 
        path: 'room/:houseId', 
        loadComponent: () => import('./admin/rooms/room-list/room-list.component').then(m => m.RoomListComponent) 
      },
      { 
        path: 'roomAll/:userId', 
        loadComponent: () => import('./admin/rooms/room-list/room-list.component').then(m => m.RoomListComponent) 
      },

      // Other Admin Routes
      { 
        path: 'roomservice/:roomId', 
        loadComponent: () => import('./admin/roomservices/roomservices-list/roomservices-list.component').then(m => m.RoomservicesListComponent) 
      },
      { 
        path: 'roomservice/create/:roomId', 
        loadComponent: () => import('./admin/roomservices/roomservices-create/roomservices-create.component').then(m => m.RoomservicesCreateComponent) 
      },
      { 
        path: 'tenant/room/:roomId', 
        loadComponent: () => import('./admin/tenants/tenant-list/tenant-list.component').then(m => m.TenantListComponent) 
      },
      { 
        path: 'tenant/house/:houseId', 
        loadComponent: () => import('./admin/tenants/tenant-list/tenant-list.component').then(m => m.TenantListComponent) 
      },
      { 
        path: 'tenant/user/:userId', 
        loadComponent: () => import('./admin/tenants/tenant-list/tenant-list.component').then(m => m.TenantListComponent) 
      },
      { 
        path: 'tenant/create/:roomId', 
        loadComponent: () => import('./admin/tenants/tenant-create/tenant-create.component').then(m => m.TenantCreateComponent) 
      },
      { 
        path: 'tenant/edit/:tenantId', 
        loadComponent: () => import('./admin/tenants/tenant-edit/tenant-edit.component').then(m => m.TenantEditComponent) 
      },
      { 
        path: 'invoice', 
        loadComponent: () => import('./admin/invoices/invoice-list/invoice-list.component').then(m => m.InvoiceListComponent) 
      },
      { 
        path: 'invoice/create/:roomId', 
        loadComponent: () => import('./admin/invoices/invoice-create/invoice-create.component').then(m => m.InvoiceCreateComponent) 
      },
      { 
        path: 'invoice/detail/:invoiceId', 
        loadComponent: () => import('./admin/invoices/invoice-detail/invoice-detail.component').then(m => m.InvoiceDetailComponent) 
      },
      { 
        path: 'support', 
        loadComponent: () => import('./admin/supportrequest/supportrequest-list/supportrequest-list.component').then(m => m.SupportrequestListComponent) 
      },
      { 
        path: 'support/create', 
        loadComponent: () => import('./admin/supportrequest/supportrequest-create/supportrequest-create.component').then(m => m.SupportrequestCreateComponent) 
      },
      { 
        path: 'support/edit/:id', 
        loadComponent: () => import('./admin/supportrequest/supportrequest-edit/supportrequest-edit.component').then(m => m.SupportrequestEditComponent) 
      }
    ]
  }
];