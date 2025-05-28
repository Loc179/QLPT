import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { IUserService } from './user.service.interface';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  private readonly apiUrl: string = 'http://localhost:5297/api/user';

  constructor(private readonly httpClient: HttpClient) { }
  getAll(page?: number, pageSize?: number) {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<UserModel>>(this.apiUrl, {params});
  }

  getById(id: number) {
    return this.httpClient.get<UserModel>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: UserModel): Observable<any> {
    return this.httpClient.put<UserModel>(`${this.apiUrl}`, user);
  }

  banUser(userId: number, isBanned: number): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/ban`, { id: userId, isBanned });
  }
}
