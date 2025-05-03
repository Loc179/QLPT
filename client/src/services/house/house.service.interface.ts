import { Observable } from "rxjs";
import { HouseModel } from "../../models/house/house.model";

export interface IHouseService {
    getAll(): Observable<HouseModel[]>;
    getById(id: number): Observable<HouseModel>;
    getByUserId(userId: number): Observable<HouseModel[]>;
    create(house: HouseModel): Observable<any>;
    update(id: number, house: HouseModel): Observable<any>;
    delete(id: number): Observable<any>;
}