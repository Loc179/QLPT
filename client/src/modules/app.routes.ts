import { AdminDashboardComponent } from './webadmin/admin-dashboard/admin-dashboard.component';
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
        loadComponent: () => import('./public/home/home/home.component').then(m => m.HomeComponent),
        data: { breadcrumb: 'Trang chủ' }
      },
      { 
        path: 'price', 
        loadComponent: () => import('./public/price-list/price-list.component').then(m => m.PriceListComponent),
        data: { breadcrumb: 'Giá cả' }
      },
      { 
        path: 'filter', 
        loadComponent: () => import('./public/advertisement/advertisement-home/advertisement-home.component').then(m => m.AdvertisementHomeComponent),
        data: { breadcrumb: 'Lọc quảng cáo' }
      },
      { 
        path: 'saved', 
        loadComponent: () => import('./public/advertisement/saved-advertisement/saved-advertisement.component').then(m => m.SavedAdvertisementComponent),
        data: { breadcrumb: 'Quảng cáo đã lưu' }
      },
      { 
        path: 'advertisement/:id', 
        loadComponent: () => import('./advertisement/detail/detail.component').then(m => m.DetailComponent),
        data: { breadcrumb: 'Chi tiết quảng cáo' }
      },
      { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
        data: { breadcrumb: 'Đăng nhập' }
      },
      { 
        path: 'register', 
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent),
        data: { breadcrumb: 'Đăng ký' }
      },
      { 
        path: 'vnpay-return', 
        loadComponent: () => import('./auth/vnpay-return/vnpay-return.component').then(m => m.VnpayReturnComponent),
        data: { breadcrumb: 'Trở về VNPAY' }
      },
      { 
        path: 'invoice/vnpay-return', 
        loadComponent: () => import('./admin/invoices/invoice-update-status/invoice-update-status.component').then(m => m.InvoiceUpdateStatusComponent),
        data: { breadcrumb: 'Trở về VNPAY' }
      },
      { 
        path: 'vipcard', 
        loadComponent: () => import('./shared/cards/vip-card/vip-card.component').then(m => m.VipCardComponent),
        data: { breadcrumb: 'Thẻ VIP' }
      },
      { 
        path: 'normalcard', 
        loadComponent: () => import('./shared/cards/normal-card/normal-card.component').then(m => m.NormalCardComponent),
        data: { breadcrumb: 'Thẻ Thường' }
      }
    ]
  },

  {
    path: 'webadmin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'home', 
        loadComponent: () => import('./webadmin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        data: { breadcrumb: 'Trang chủ' }
      },
      { 
        path: 'advertisement-management', 
        loadComponent: () => import('./webadmin/advertisement-manager/advertisement-manager.component').then(m => m.AdvertisementManagerComponent),
        data: { breadcrumb: 'Quản lý quảng cáo' }
      },
      { 
        path: 'advertisement/detail/:id', 
        loadComponent: () => import('./webadmin/advertisement-detail/advertisement-detail.component').then(m => m.AdvertisementDetailComponent),
        data: { breadcrumb: 'Chi tiết quảng cáo' }
      },
      { 
        path: 'servicepackage', 
        loadComponent: () => import('./webadmin/servicepackage/servicepackage.component').then(m => m.ServicepackageComponent),
        data: { breadcrumb: 'Gói dịch vụ' }
      },
      { 
        path: 'supportrequest', 
        loadComponent: () => import('./webadmin/supportrequestreply/supportrequestreply.component').then(m => m.SupportrequestreplyComponent),
        data: { breadcrumb: 'Yêu cầu hỗ trợ' }
      },
      { 
        path: 'user-management', 
        loadComponent: () => import('./webadmin/user-manager/user-manager.component').then(m => m.UserManagerComponent),
        data: { breadcrumb: 'Quản lý người dùng' }
      },
      { 
        path: 'user-detail/:id', 
        loadComponent: () => import('./webadmin/user-detail/user-detail.component').then(m => m.UserDetailComponent),
        data: { breadcrumb: 'Chi tiết người dùng' }
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
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { breadcrumb: 'Trang chủ' }
      },
      { 
        path: 'advertisement', 
        loadComponent: () => import('./admin/advertisement/advertisement-list/advertisement-list.component').then(m => m.AdvertisementListComponent),
        data: { breadcrumb: 'Quản lý quảng cáo' }
      },
      { 
        path: 'advertisement/create', 
        loadComponent: () => import('./admin/advertisement/advertisement-create/advertisement-create.component').then(m => m.AdvertisementCreateComponent),
        data: { breadcrumb: 'Tạo quảng cáo' }
      },
      { 
        path: 'advertisement/edit/:id', 
        loadComponent: () => import('./admin/advertisement/advertisement-edit/advertisement-edit.component').then(m => m.AdvertisementEditComponent),
        data: { breadcrumb: 'Chỉnh sửa quảng cáo' }
      },
      { 
        path: 'advertisement/detail/:id', 
        loadComponent: () => import('./admin/advertisement/advertisement-detail/advertisement-detail.component').then(m => m.AdvertisementDetailComponent),
        data: { breadcrumb: 'Chi tiết quảng cáo' }
      },

      // House Routes
      { 
        path: 'house/create', 
        loadComponent: () => import('./admin/houses/house-create/house-create.component').then(m => m.HouseCreateComponent),
        data: { breadcrumb: 'Tạo nhà' }
      },
      { 
        path: 'house/edit/:houseId', 
        loadComponent: () => import('./admin/houses/house-edit/house-edit.component').then(m => m.HouseEditComponent),
        data: { breadcrumb: 'Chỉnh sửa nhà' }
      },
      { 
        path: 'house/detail/:houseId', 
        loadComponent: () => import('./admin/houses/house-detail/house-detail.component').then(m => m.HouseDetailComponent),
        data: { breadcrumb: 'Chi tiết nhà' }
      },
      { 
        path: 'house/:userId', 
        loadComponent: () => import('./admin/houses/house-list/house-list.component').then(m => m.HouseListComponent),
        data: { breadcrumb: 'Danh sách nhà' }
      },

      // Room Routes
      { 
        path: 'room/create', 
        loadComponent: () => import('./admin/rooms/room-create/room-create.component').then(m => m.RoomCreateComponent),
        data: { breadcrumb: 'Tạo phòng' }
      },
      { 
        path: 'room/edit/:roomId', 
        loadComponent: () => import('./admin/rooms/room-edit/room-edit.component').then(m => m.RoomEditComponent),
        data: { breadcrumb: 'Chỉnh sửa phòng' }
      },
      { 
        path: 'room/detail/:roomId', 
        loadComponent: () => import('./admin/rooms/room-detail/room-detail.component').then(m => m.RoomDetailComponent),
        data: { breadcrumb: 'Chi tiết phòng' }
      },
      { 
        path: 'room/:houseId', 
        loadComponent: () => import('./admin/rooms/room-list/room-list.component').then(m => m.RoomListComponent),
        data: { breadcrumb: 'Danh sách phòng' }
      },
      { 
        path: 'roomAll/:userId', 
        loadComponent: () => import('./admin/rooms/room-list/room-list.component').then(m => m.RoomListComponent),
        data: { breadcrumb: 'Danh sách phòng' }
      },

      
      { 
        path: 'roomservice/:roomId', 
        loadComponent: () => import('./admin/roomservices/roomservices-list/roomservices-list.component').then(m => m.RoomservicesListComponent),
        data: { breadcrumb: 'Danh sách dịch vụ phòng' }
      },
      { 
        path: 'roomservice/create/:roomId', 
        loadComponent: () => import('./admin/roomservices/roomservices-create/roomservices-create.component').then(m => m.RoomservicesCreateComponent),
        data: { breadcrumb: 'Tạo dịch vụ phòng' }
      },
      { 
        path: 'tenant/room/:roomId', 
        loadComponent: () => import('./admin/tenants/tenant-list/tenant-list.component').then(m => m.TenantListComponent),
        data: { breadcrumb: 'Danh sách người thuê theo phòng' }
      },
      { 
        path: 'tenant/house/:houseId', 
        loadComponent: () => import('./admin/tenants/tenant-list/tenant-list.component').then(m => m.TenantListComponent),
        data: { breadcrumb: 'Danh sách người thuê theo nhà' }
      },
      { 
        path: 'tenant/user/:userId', 
        loadComponent: () => import('./admin/tenants/tenant-list/tenant-list.component').then(m => m.TenantListComponent),
        data: { breadcrumb: 'Danh sách người thuê theo người dùng' }
      },
      { 
        path: 'tenant/create/:roomId', 
        loadComponent: () => import('./admin/tenants/tenant-create/tenant-create.component').then(m => m.TenantCreateComponent),
        data: { breadcrumb: 'Tạo người thuê' }
      },
      { 
        path: 'tenant/edit/:tenantId', 
        loadComponent: () => import('./admin/tenants/tenant-edit/tenant-edit.component').then(m => m.TenantEditComponent),
        data: { breadcrumb: 'Chỉnh sửa người thuê' }
      },
      { 
        path: 'invoice', 
        loadComponent: () => import('./admin/invoices/invoice-list/invoice-list.component').then(m => m.InvoiceListComponent),
        data: { breadcrumb: 'Danh sách hóa đơn' }
      },
      { 
        path: 'invoice/create/:roomId', 
        loadComponent: () => import('./admin/invoices/invoice-create/invoice-create.component').then(m => m.InvoiceCreateComponent),
        data: { breadcrumb: 'Tạo hóa đơn' }
      },
      { 
        path: 'invoice/detail/:invoiceId', 
        loadComponent: () => import('./admin/invoices/invoice-detail/invoice-detail.component').then(m => m.InvoiceDetailComponent),
        data: { breadcrumb: 'Chi tiết hóa đơn' }
      },
      { 
        path: 'support', 
        loadComponent: () => import('./admin/supportrequest/supportrequest-list/supportrequest-list.component').then(m => m.SupportrequestListComponent),
        data: { breadcrumb: 'Danh sách yêu cầu hỗ trợ' }
      },
      { 
        path: 'support/create', 
        loadComponent: () => import('./admin/supportrequest/supportrequest-create/supportrequest-create.component').then(m => m.SupportrequestCreateComponent),
        data: { breadcrumb: 'Tạo yêu cầu hỗ trợ' }
      },
      { 
        path: 'support/edit/:id', 
        loadComponent: () => import('./admin/supportrequest/supportrequest-edit/supportrequest-edit.component').then(m => m.SupportrequestEditComponent),
        data: { breadcrumb: 'Chỉnh sửa yêu cầu hỗ trợ' }
      },
      { 
        path: 'contract', 
        loadComponent: () => import('./admin/contract/contract-list/contract-list.component').then(m => m.ContractListComponent),
        data: { breadcrumb: 'Danh sách hợp đồng' }
      },
      { 
        path: 'contract/create', 
        loadComponent: () => import('./admin/contract/contract-create/contract-create.component').then(m => m.ContractCreateComponent),
        data: { breadcrumb: 'Tạo hợp đồng' }
      },
      { 
        path: 'contract/edit/:id',
        loadComponent: () => import('./admin/contract/contract-update/contract-update.component').then(m => m.ContractUpdateComponent),
        data: { breadcrumb: 'Chỉnh sửa hợp đồng' }
      },
      { 
        path: 'contract/detail/:id',
        loadComponent: () => import('./admin/contract/contract-detail/contract-detail.component').then(m => m.ContractDetailComponent),
        data: { breadcrumb: 'Chi tiết hợp đồng' }
      }
    ]
  }
];