import { Observable } from "rxjs";
import { RoomServiceModel } from "../../models/roomservice/roomservice.model";

export interface IRoomserviceService {
    getAll(): Observable<RoomServiceModel[]>;
    getById(id: number): Observable<RoomServiceModel>;
    create(service: RoomServiceModel): Observable<any>;
    update(id: number, service: RoomServiceModel): Observable<any>;
    delete(id: number): Observable<any>;
}