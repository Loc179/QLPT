import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AUTH_SERVICE } from '../../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../../services/auth/auth.service.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public userId: number | null = null;
  public role: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { }
  
  ngOnInit() {
    const userInfoString = localStorage.getItem('userInformation');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      this.userId = userInfo.id;
      this.role = userInfo.roles[0];
      console.log('User ID1:', this.userId);
      console.log('User Role1:', this.role);
    }
  }

  navigateToHouse() {
    const path = `/admin/house/${this.userId}`;
    this.router.navigate([path]);
  }

  navigateToRoom() {
    const path = `/admin/roomAll/${this.userId}`;
    this.router.navigate([path]);
  }

  navigateToTenant() {
    const path = `/admin/tenant/user/${this.userId}`;
    this.router.navigate([path]);
  }
  
  navigateToInvoice() {
    const path = `/admin/invoice`;
    this.router.navigate([path]);
  }
  
  navigateToSupport() {
    const path = `/admin/support`;
    this.router.navigate([path]);
  }
  
  navigateToAdvertisement() {
    const path = `/admin/advertisement`;
    this.router.navigate([path]);
  }

  // Webadmin
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}