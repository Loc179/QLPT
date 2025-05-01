import { Observable } from "rxjs";
import { UserInformation } from "../../models/auth/user-information.model";
import { LoginResponse } from "../../models/auth/login-response.model";
import { LoginRequest } from "../../models/auth/login-request.model";
import { RegisterRequest } from "../../models/auth/register-request.model";
import { RegisterResponse } from "../../models/auth/register-response.model";

export interface IAuthService {
    login(loginRequest: LoginRequest, remember : boolean): Observable<LoginResponse>;
    register(registerRequest: RegisterRequest): Observable<RegisterResponse>;
    vnpayReturn(queryParams: any): Observable<any>;
    logout(): void;
    isAuthenticated(): Observable<boolean>;
    getUserInformation(): Observable<UserInformation | null>;
    getUserInformationFromAccessToken(): Observable<UserInformation | null>;
    getAccessToken(): string;
    getUserRoles() : string[];
    hasRole(allowedRoles: string[]): boolean;
}