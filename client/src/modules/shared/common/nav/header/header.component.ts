import { UserInformation } from './../../../../../models/auth/user-information.model';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AUTH_SERVICE } from '../../../../../constants/injection/injection.constant';
import { IAuthService } from '../../../../../services/auth/auth.service.interface';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public userId: number | null = null;
  public userInfo: UserInformation | null = null;
  public isDropdownOpen = false;

  @ViewChild('dropdownRef', { static: false }) dropdownRef!: ElementRef;

  constructor(
    private readonly router: Router,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    private readonly sidebarService: SidebarService,
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

  // Lắng nghe click outside để đóng dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  logout() {
    this.authService.logout();
    this.closeDropdown();
    this.router.navigate(['/']);
  }

  // Ngăn chặn event bubbling khi click vào dropdown
  onDropdownClick(event: Event) {
    event.stopPropagation();
  }

  toggleSidebar() {
    console.log('Toggling sidebar');
    this.sidebarService.toggleSidebar();
  }

}