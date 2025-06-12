import { Observable } from "rxjs";
import { UserInformation } from "../../models/auth/user-information.model";
import { LoginResponse } from "../../models/auth/login-response.model";
import { LoginRequest } from "../../models/auth/login-request.model";
import { RegisterRequest } from "../../models/auth/register-request.model";
import { RegisterResponse } from "../../models/auth/register-response.model";
import { ForgotPasswordRequest } from "../../models/auth/forgot-password-request.model";
import { ResetPasswordRequest } from "../../models/auth/reset-password-request.model";

export interface IAuthService {
    login(loginRequest: LoginRequest, remember : boolean): Observable<LoginResponse>;
    register(registerRequest: RegisterRequest): Observable<RegisterResponse>;
    vnpayReturn(queryParams: any): Observable<any>;
    logout(): void;
    isAuthenticated(): Observable<boolean>;
    getUserInformation(): Observable<UserInformation | null>;
    getUserInformationFromAccessToken(): Observable<UserInformation | null>;
    getAccessToken(): string;
    getRefreshToken(): string;
    getUserRoles() : string[];
    getUserId(): number;
    hasRole(allowedRoles: string[]): boolean;
    forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Observable<void>;
    resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<boolean>;
    refreshToken(refreshToken: string): Observable<string>;
}