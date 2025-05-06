import { Observable } from "rxjs";
import { TenantModel } from "../../models/tenant/tenant.model";

export interface ITenantService {
    getAll(): Observable<TenantModel[]>;
    getById(id: number): Observable<TenantModel>;
    getByRoomId(roomId: number): Observable<TenantModel[]>;
    create(data: TenantModel): Observable<any>;
    update(id: number, data: TenantModel): Observable<any>;
    delete(id: number): Observable<any>;
}