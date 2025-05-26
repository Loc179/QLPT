import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PERMISSION_SERVICE } from '../constants/injection/injection.constant';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const permissionsService = inject(PERMISSION_SERVICE);
    const accessToken = permissionsService.getAccessToken();

    const isApiUrl = req.url.startsWith('http://localhost:5297/');

    if (isApiUrl && accessToken) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return next(req);
    }
    return next(req);
};

