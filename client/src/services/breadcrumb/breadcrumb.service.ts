import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbModel } from '../../models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly _breadcrumbs = new BehaviorSubject<BreadcrumbModel[]>([]);
  public readonly breadcrumbs$ = this._breadcrumbs.asObservable();

  constructor(private readonly router: Router) {
    // Lắng nghe sự kiện NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.createBreadcrumbs();
    });

    // Khởi tạo breadcrumbs ngay lập tức khi service được tạo
    // Điều này sẽ đảm bảo breadcrumbs được tạo ngay cả khi tải lại trang
    setTimeout(() => {
      this.createBreadcrumbs();
    }, 0);
  }

  private createBreadcrumbs(): void {
  const root = this.router.routerState.snapshot.root;
  const breadcrumbs: BreadcrumbModel[] = [];

  const currentUrl = this.router.url;

  // Tùy theo layout
  if (currentUrl.startsWith('/admin')) {
    breadcrumbs.push({
      label: 'Trang chủ',
      url: '/admin/dashboard'
    });
  } else if (currentUrl.startsWith('/webadmin')) {
    breadcrumbs.push({
      label: 'Trang quản trị',
      url: '/webadmin/home'
    });
  } else {
    breadcrumbs.push({
      label: 'Trang chủ',
      url: '/'
    });
  }

  this.addBreadcrumb(root, [], breadcrumbs);
  this._breadcrumbs.next(breadcrumbs);
}


  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: BreadcrumbModel[]
  ) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      const url = '/' + routeUrl.join('/');
      
      if (route.routeConfig?.path) {
        const label = this.getLabelForRoute(route);
        
        if (label) {
          breadcrumbs.push({
            label: label,
            url: url
          });
        }
      }
      
      if (route.firstChild) {
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
      }
    }
  }

  private getLabelForRoute(route: ActivatedRouteSnapshot): string {
  const breadcrumb = route.data?.['breadcrumb'];
  if (breadcrumb) {
    return breadcrumb;
  }

  const path = route.routeConfig?.path;
  if (!path || path === '' || path === '**' || path === 'admin' || path === 'webadmin') {
    return '';
  }

  if (path.includes(':id/detail')) return 'Chi tiết';
  if (path.includes(':id/edit')) return 'Chỉnh sửa';
  if (path === 'create') return 'Tạo mới';

  switch (path) {
    case 'dashboard': return '';
    case 'users': return 'Người dùng';
    case 'landlords': return 'Chủ trọ';
    case 'webadmins': return 'Quản trị viên';
    default:
      return path.split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
}

  public refresh(): void {
    this.createBreadcrumbs();
  }
}