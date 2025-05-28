import { Observable } from "rxjs";
import { TenantModel } from "../../models/tenant/tenant.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface ITenantService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>>;
    getById(id: number): Observable<TenantModel>;
    getByRoomId(roomId: number, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>>;
    getByHouseId(houseId: number, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>>;
    getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>>;
    search(id: number, keyword: string, page?: number, pageSize?: number): Observable<PaginatedResult<TenantModel>>;
    create(data: TenantModel): Observable<any>;
    update(id: number, data: TenantModel): Observable<any>;
    delete(id: number): Observable<any>;
}