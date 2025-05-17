import { Inject, Injectable } from '@angular/core';
import { IPermissionService } from './permission.service.interface';
import { AUTH_SERVICE } from '../../constants/injection/injection.constant';
import { Router } from '@angular/router';
import { IAuthService } from '../auth/auth.service.interface';

@Injectable({
  providedIn: 'root'
})

export class PermissionService implements IPermissionService {
  private readonly roles: string[] = [];
  constructor(
    private readonly router: Router,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  isUnauthenticated(): boolean {
    this.authService.isAuthenticated().subscribe((res) => {
      if (res) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    });
    return true;
  }

  getAccessToken(): string {
    return this.authService.getAccessToken();
  }

  hasRole(roles: string[]): boolean {
    this.authService.getUserInformation().subscribe((res) => {
      return roles.some(role=>res?.roles.includes(role));
    });
    return false;
  }

}
