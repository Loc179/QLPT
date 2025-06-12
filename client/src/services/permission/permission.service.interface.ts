import { Observable } from "rxjs";

export interface IPermissionService {
  canActivate(): boolean;
  isUnauthenticated(): boolean;
  getAccessToken(): string;
  getRefreshToken(): string;
  refreshToken(refreshToken: string): Observable<string>;
  hasRole(roles: string[]): boolean;
}
