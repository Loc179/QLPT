import { Injectable } from '@angular/core';
import { IAuthService } from './auth.service.interface';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../../models/auth/login-request.model';
import { LoginResponse } from '../../models/auth/login-response.model';
import { UserInformation } from '../../models/auth/user-information.model';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../../models/auth/register-request.model';
import { RegisterResponse } from '../../models/auth/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private readonly apiUrl: string = 'http://localhost:5297/api/auth';

  private readonly _isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private readonly _isAuthenticated$: Observable<boolean> =
    this._isAuthenticated.asObservable();

  private readonly _userInformation: BehaviorSubject<UserInformation | null> =
    new BehaviorSubject<UserInformation | null>(null);

  private readonly _userInformation$: Observable<UserInformation | null> =
    this._userInformation.asObservable();

  constructor(private readonly httpClient: HttpClient) {
    const lsToken = localStorage.getItem('accessToken');
    const ssToken = sessionStorage.getItem('accessToken');

    if (lsToken) {
      // -> rememberMe = true
      this._isAuthenticated.next(true);
      const userInformation = localStorage.getItem('userInformation');
      if (userInformation) {
        this._userInformation.next(JSON.parse(userInformation));
      }
    } else if (ssToken) {
      // -> rememberMe = false
      this._isAuthenticated.next(true);
      const userInformation = sessionStorage.getItem('userInformation');
      if (userInformation) {
        this._userInformation.next(JSON.parse(userInformation));
      }
    }


  }
  getUserId(): number {
    const userInfo = this._userInformation.getValue();
    return userInfo?.id ?? 0;
  }
  
  vnpayReturn(queryParams: any): Observable<any> {
    return this.httpClient.post<boolean>(`${this.apiUrl}/vnpay-return`, queryParams)
  }
  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${this.apiUrl}/register-and-pay`, registerRequest);
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken') ?? sessionStorage.getItem('accessToken') ?? '';
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') ?? sessionStorage.getItem('refreshToken') ?? '';
  }

  public isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated$;
  }

  public getUserInformation(): Observable<UserInformation | null> {
    return this._userInformation$;
  }

  public getUserInformationFromAccessToken(): Observable<UserInformation | null> {
    // Using JWT to decode the access token and get the user information
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const userInformation: UserInformation = {
        id: payload.nameid,
        email: payload.email,
        displayName: payload.fullName,
        username: payload.unique_name,
        roles:
          payload[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
      };
      this._userInformation.next(userInformation);
    }
    return this._userInformation$;
  }

  logout(): void {
    this.httpClient.post<boolean>(`${this.apiUrl}/logout`, { refreshToken: this.getRefreshToken() });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInformation');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userInformation');
    this._isAuthenticated.next(false);
    this._userInformation.next(null);

  }

  public login(loginRequest: LoginRequest, rememberMe: boolean): Observable<LoginResponse> {

    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        tap((response: LoginResponse) => {
          if (rememberMe) {
            // Lưu vào localStorage
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userInformation', JSON.stringify(response.userInfo));
          } else {
            // Lưu vào sessionStorage
            sessionStorage.setItem('accessToken', response.accessToken);
            sessionStorage.setItem('refreshToken', response.refreshToken);
            sessionStorage.setItem('userInformation', JSON.stringify(response.userInfo));
          }
          this._isAuthenticated.next(true);
          this._userInformation.next(response.userInfo);
        })
      );
  }
  
  public getUserRoles(): string[] {
    const userInfo: UserInformation | null = this._userInformation.getValue();
    if (userInfo?.roles) {
      return Array.isArray(userInfo.roles)
        ? userInfo.roles
        : [userInfo.roles];
    }
    return [];
  }

  public hasRole(allowedRoles: string[]): boolean {
    const roles = this.getUserRoles();
    return allowedRoles.some(role => roles.includes(role));
  }
}
