import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { IUserService } from './user.service.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  private readonly apiUrl: string = 'http://localhost:5297/api/user';

  constructor(private readonly httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<UserModel[]>(this.apiUrl);
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
