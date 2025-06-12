import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { PERMISSION_SERVICE } from '../constants/injection/injection.constant';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const permissionService = inject(PERMISSION_SERVICE);
  const accessToken = permissionService.getAccessToken();
  const isApiUrl = req.url.startsWith('http://localhost:5297/');

  let authReq = req;

  if (isApiUrl && accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && isApiUrl) {
        // Gọi refresh token nếu access token hết hạn
        const refreshToken = permissionService.getRefreshToken();

        if (!refreshToken) {
          // Không có refresh token thì không xử lý được
          return throwError(() => error);
        }

        // Gọi API refresh token (trả về observable)
        return permissionService.refreshToken(refreshToken).pipe(
          switchMap((newAccessToken) => {
            // Gắn token mới vào request cũ
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return next(retryReq); // Gửi lại request ban đầu
          }),
          catchError(() => {
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error); // các lỗi khác
    })
  );
};
