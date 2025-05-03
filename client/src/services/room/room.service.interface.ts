import { Observable } from "rxjs";
import { RoomModel } from "../../models/room/room.model";

export interface IRoomService {
    getAll(): Observable<RoomModel[]>;
    getById(id: number): Observable<RoomModel>;
    getByHouseId(houseId: number): Observable<RoomModel[]>;
    create(room: RoomModel): Observable<any>;
    update(id: number, room: RoomModel): Observable<any>;
    delete(id: number): Observable<any>;
}