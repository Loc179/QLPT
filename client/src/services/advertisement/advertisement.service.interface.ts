import { Observable } from "rxjs";
import { AdvertisementModel } from "../../models/advertisement/advertisement.model";
import { AdvertisementResponseModel } from "../../models/advertisement/advertisement-response.model";

export interface IAdvertisementService {
    getAll(): Observable<AdvertisementResponseModel[]>;
    getById(id: number): Observable<AdvertisementResponseModel>;
    getByUserId(id: number): Observable<AdvertisementResponseModel[]>;
    create(advertisement: FormData): Observable<any>;
    update(id: number, advertisement: AdvertisementModel): Observable<any>;
    delete(id: number): Observable<any>;
}