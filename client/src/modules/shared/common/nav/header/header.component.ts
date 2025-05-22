import { UserInformation } from './../../../../../models/auth/user-information.model';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AUTH_SERVICE } from '../../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../../services/auth/auth.service.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public userId: number | null = null;
  public userInfo: UserInformation | null = null;
  public isDropdownOpen = false;

  constructor(
    private readonly router: Router,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { }

  ngOnInit() {
    const userInfoString = localStorage.getItem('userInformation');
    if (userInfoString) {
      this.userInfo = JSON.parse(userInfoString);
    }

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeDropdown();
    this.router.navigate(['/login']);
  }
}
