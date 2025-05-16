import { Observable } from "rxjs";
import { UserModel } from "../../models/user/user.model";

export interface IUserService {
    getAll(): Observable<UserModel[]>;
    getById(id: number): Observable<UserModel>;
    updateUser(user: UserModel): Observable<any>;
    banUser(userId: number, isBanned: number): Observable<any>;
}