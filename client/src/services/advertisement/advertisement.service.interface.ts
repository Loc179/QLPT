import { Observable } from "rxjs";
import { AdvertisementModel } from "../../models/advertisement/advertisement.model";

export interface IAdvertisementService {
    getAll(): Observable<AdvertisementModel[]>;
    getById(id: number): Observable<AdvertisementModel>;
    create(advertisement: FormData): Observable<any>;
    update(id: number, advertisement: AdvertisementModel): Observable<any>;
    delete(id: number): Observable<any>;
}