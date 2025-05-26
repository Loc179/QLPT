import { Observable } from "rxjs";
import { AdvertisementModel } from "../../models/advertisement/advertisement.model";
import { AdvertisementResponseModel } from "../../models/advertisement/advertisement-response.model";
import { AdvertisementFilter } from "../../models/advertisement/advertisement-filter.model";

export interface IAdvertisementService {
    getAll(): Observable<AdvertisementResponseModel[]>;
    getByStatus(status: number): Observable<AdvertisementResponseModel[]>;
    getById(id: number): Observable<AdvertisementResponseModel>;
    getByUserId(id: number): Observable<AdvertisementResponseModel[]>;
    getByFilter(filter: AdvertisementFilter): Observable<AdvertisementResponseModel[]>
    create(advertisement: FormData): Observable<any>;
    update(id: number, advertisement: FormData): Observable<any>;
    updateStatus(id: number, status: number): Observable<any>;
    delete(id: number): Observable<any>;
}