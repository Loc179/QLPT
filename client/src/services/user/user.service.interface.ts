import { Observable } from "rxjs";
import { UserModel } from "../../models/user/user.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface IUserService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<UserModel>>;
    getById(id: number): Observable<UserModel>;
    updateUser(user: UserModel): Observable<any>;
    banUser(userId: number, status: number): Observable<any>;
}