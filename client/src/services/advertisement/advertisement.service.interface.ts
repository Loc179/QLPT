import { Observable } from "rxjs";
import { AdvertisementResponseModel } from "../../models/advertisement/advertisement-response.model";
import { AdvertisementFilter } from "../../models/advertisement/advertisement-filter.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface IAdvertisementService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>>;
    getByStatus(status: number, page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>>;
    getById(id: number): Observable<AdvertisementResponseModel>;
    getByUserId(id: number, page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>>;
    getByFilter(filter: AdvertisementFilter, page?: number, pageSize?: number): Observable<PaginatedResult<AdvertisementResponseModel>>
    create(advertisement: FormData): Observable<any>;
    update(id: number, advertisement: FormData): Observable<any>;
    updateStatus(id: number, status: number): Observable<any>;
    delete(id: number): Observable<any>;
}