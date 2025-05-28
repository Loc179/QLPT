import { Observable } from "rxjs";
import { HouseModel } from "../../models/house/house.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface IHouseService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<HouseModel>>;
    getById(id: number): Observable<HouseModel>;
    search(id: number, keyword: string, page?: number, pageSize?: number): Observable<PaginatedResult<HouseModel>>;
    getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<HouseModel>>;
    create(house: HouseModel): Observable<any>;
    update(id: number, house: HouseModel): Observable<any>;
    delete(id: number): Observable<any>;
}