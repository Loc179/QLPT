import { Observable } from "rxjs";
import { RoomModel } from "../../models/room/room.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface IRoomService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<RoomModel>>;
    getById(id: number): Observable<RoomModel>;
    getByHouseId(houseId: number, page?: number, pageSize?: number): Observable<PaginatedResult<RoomModel>>;
    getByUserId(userId: number, page?: number, pageSize?: number): Observable<PaginatedResult<RoomModel>>;
    create(room: RoomModel): Observable<any>;
    update(id: number, room: RoomModel): Observable<any>;
    delete(id: number): Observable<any>;
}