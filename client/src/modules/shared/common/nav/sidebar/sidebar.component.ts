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
  public isAnimating: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly sidebarService: SidebarService,
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
      const userInfo = JSON.parse(userInfoString);
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
    }
  }

  public toggleSidebar(): void {
    // Prevent multiple rapid clicks during animation
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.sidebarService.toggleSidebar();
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      this.isAnimating = false;
    }, 300); // Match with CSS transition duration
  }

  public switchMobile(): void {
    this.sidebarService.switchMobile();
  }

  // Check if a menu item should be active based on current route
  public isActive(menuPath: string): boolean {
    return this.activeMenuItem === menuPath;
  }

  // Set the active menu item based on current URL with smooth transition
  private setActiveMenuItem(url: string): void {
    let newActiveItem = '';
    
    if (url.includes('/admin/house/')) {
      newActiveItem = 'house';
    } else if (url.includes('/admin/roomAll/')) {
      newActiveItem = 'room';
    } else if (url.includes('/admin/tenant/user/')) {
      newActiveItem = 'tenant';
    } else if (url.includes('/admin/invoice')) {
      newActiveItem = 'invoice';
    } else if (url.includes('/admin/support')) {
      newActiveItem = 'support';
    } else if (url.includes('/admin/advertisement')) {
      newActiveItem = 'advertisement';
    } else if (url === '/' || url.includes('/admin/dashboard')) {
      newActiveItem = 'dashboard';
    } else if (url.includes('/webadmin/home')) {
      newActiveItem = 'webadmin-home';
    } else if (url.includes('/webadmin/user-management')) {
      newActiveItem = 'webadmin-users';
    } else if (url.includes('/webadmin/advertisement-management')) {
      newActiveItem = 'webadmin-ads';
    } else if (url.includes('/webadmin/servicepackage')) {
      newActiveItem = 'webadmin-service';
    } else if (url.includes('/webadmin/supportrequest')) {
      newActiveItem = 'webadmin-support';
    }
    
    // Add smooth transition when changing active menu item
    if (this.activeMenuItem !== newActiveItem) {
      this.activeMenuItem = newActiveItem;
    }
  }
  
  // Navigation methods with smooth transitions
  navigateToDashboard() {
    this.navigateWithTransition('/admin/dashboard', 'dashboard');
  }

  navigateToHouse() {
    this.navigateWithTransition(`/admin/house/${this.userId}`, 'house');
  }

  navigateToRoom() {
    this.navigateWithTransition(`/admin/roomAll/${this.userId}`, 'room');
  }

  navigateToTenant() {
    this.navigateWithTransition(`/admin/tenant/user/${this.userId}`, 'tenant');
  }
  
  navigateToInvoice() {
    this.navigateWithTransition('/admin/invoice', 'invoice');
  }
  
  navigateToSupport() {
    this.navigateWithTransition('/admin/support', 'support');
  }
  
  navigateToAdvertisement() {
    this.navigateWithTransition('/admin/advertisement', 'advertisement');
  }

  // Webadmin navigation
  navigateTo(path: string) {
    let menuItem = '';
    
    if (path.includes('/webadmin/home')) {
      menuItem = 'webadmin-home';
    } else if (path.includes('/webadmin/user-management')) {
      menuItem = 'webadmin-users';
    } else if (path.includes('/webadmin/advertisement-management')) {
      menuItem = 'webadmin-ads';
    } else if (path.includes('/webadmin/servicepackage')) {
      menuItem = 'webadmin-service';
    } else if (path.includes('/webadmin/supportrequest')) {
      menuItem = 'webadmin-support';
    }
    
    this.navigateWithTransition(path, menuItem);
  }

  // Helper method for smooth navigation transitions
  private navigateWithTransition(path: string, menuItem: string): void {
    // Update active menu item immediately for visual feedback
    this.activeMenuItem = menuItem;
    
    // Navigate to the new route
    this.router.navigate([path]).catch(error => {
      console.error('Navigation error:', error);
    });
    
    // Auto-collapse sidebar on mobile after navigation
    if (this.sidebarService.isMobile && !this.sidebarService.isCollapsed) {
      setTimeout(() => {
        this.toggleSidebar();
      }, 150);
    }
  }

  // Method to get current sidebar state for animations
  public getSidebarState(): string {
    return this.sidebarService.isCollapsed ? 'collapsed' : 'expanded';
  }
}