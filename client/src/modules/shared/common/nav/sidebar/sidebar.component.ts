import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { AUTH_SERVICE } from '../../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../../services/auth/auth.service.interface';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../../../services/sidebar/sidebar.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  public userId: number | null = null;
  public role: string | null = null;
  public activeMenuItem: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly sidebarService: SidebarService, // Changed to public for template access
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { 
    // Subscribe to router events to update active menu item
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveMenuItem(this.router.url);
    });
  }
  
  ngOnInit() {
    const userInfoString = localStorage.getItem('userInformation');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      this.userId = userInfo.id;
      this.role = userInfo.roles[0];
      console.log('User ID1:', this.userId);
      console.log('User Role1:', this.role);
    }
    
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
    
    // Set initial active menu item based on current URL
    this.setActiveMenuItem(this.router.url);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (window.innerWidth < 768 && !this.sidebarService.isMobile) {
      this.switchMobile();
      if (!this.sidebarService.isCollapsed) {
        this.toggleSidebar();
      }
    }
    else if (window.innerWidth >= 768 && this.sidebarService.isMobile) {
      this.switchMobile();
      if (this.sidebarService.isCollapsed) {
        // No need to auto-expand on desktop, let the user decide
        // this.toggleSidebar();
      }
    }
  }

  public toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  public switchMobile(): void {
    this.sidebarService.switchMobile();
  }

  // Check if a menu item should be active based on current route
  public isActive(menuPath: string): boolean {
    return this.activeMenuItem === menuPath;
  }

  // Set the active menu item based on current URL
  private setActiveMenuItem(url: string): void {
    if (url.includes('/admin/house/')) {
      this.activeMenuItem = 'house';
    } else if (url.includes('/admin/roomAll/')) {
      this.activeMenuItem = 'room';
    } else if (url.includes('/admin/tenant/user/')) {
      this.activeMenuItem = 'tenant';
    } else if (url.includes('/admin/invoice')) {
      this.activeMenuItem = 'invoice';
    } else if (url.includes('/admin/support')) {
      this.activeMenuItem = 'support';
    } else if (url.includes('/admin/advertisement')) {
      this.activeMenuItem = 'advertisement';
    } else if (url === '/') {
      this.activeMenuItem = 'dashboard';
    } else if (url.includes('/webadmin/home')) {
      this.activeMenuItem = 'webadmin-home';
    } else if (url.includes('/webadmin/user-management')) {
      this.activeMenuItem = 'webadmin-users';
    } else if (url.includes('/webadmin/advertisement-management')) {
      this.activeMenuItem = 'webadmin-ads';
    } else if (url.includes('/webadmin/servicepackage')) {
      this.activeMenuItem = 'webadmin-service';
    } else if (url.includes('/webadmin/supportrequest')) {
      this.activeMenuItem = 'webadmin-support';
    }
  }

  navigateToHouse() {
    const path = `/admin/house/${this.userId}`;
    this.router.navigate([path]);
    this.activeMenuItem = 'house';
  }

  navigateToRoom() {
    const path = `/admin/roomAll/${this.userId}`;
    this.router.navigate([path]);
    this.activeMenuItem = 'room';
  }

  navigateToTenant() {
    const path = `/admin/tenant/user/${this.userId}`;
    this.router.navigate([path]);
    this.activeMenuItem = 'tenant';
  }
  
  navigateToInvoice() {
    const path = `/admin/invoice`;
    this.router.navigate([path]);
    this.activeMenuItem = 'invoice';
  }
  
  navigateToSupport() {
    const path = `/admin/support`;
    this.router.navigate([path]);
    this.activeMenuItem = 'support';
  }
  
  navigateToAdvertisement() {
    const path = `/admin/advertisement`;
    this.router.navigate([path]);
    this.activeMenuItem = 'advertisement';
  }

  // Webadmin
  navigateTo(path: string) {
    this.router.navigate([path]);
    
    // Update the active menu item based on the path
    if (path.includes('/webadmin/home')) {
      this.activeMenuItem = 'webadmin-home';
    } else if (path.includes('/webadmin/user-management')) {
      this.activeMenuItem = 'webadmin-users';
    } else if (path.includes('/webadmin/advertisement-management')) {
      this.activeMenuItem = 'webadmin-ads';
    } else if (path.includes('/webadmin/servicepackage')) {
      this.activeMenuItem = 'webadmin-service';
    } else if (path.includes('/webadmin/supportrequest')) {
      this.activeMenuItem = 'webadmin-support';
    }
  }
}