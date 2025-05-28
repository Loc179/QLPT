import { Observable } from "rxjs";
import { RoomServiceModel } from "../../models/roomservice/roomservice.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface IRoomserviceService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<RoomServiceModel>>;
    getByRoomId(roomId: number, page?: number, pageSize?: number): Observable<PaginatedResult<RoomServiceModel>>;
    getById(id: number): Observable<RoomServiceModel>;
    create(service: RoomServiceModel): Observable<any>;
    update(id: number, service: RoomServiceModel): Observable<any>;
    delete(id: number): Observable<any>;
}