import { Observable } from "rxjs";
import { SupportRequestModel } from "../../models/supportrequest/supportrequest.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface ISupportrequestService {
    getAll(page?: number, pageSize?: number): Observable<PaginatedResult<SupportRequestModel>>;
    getById(id: number): Observable<SupportRequestModel>;
    getByUserId(userId: number, status: number | null, page?: number, pageSize?: number): Observable<PaginatedResult<SupportRequestModel>>;
    create(data: SupportRequestModel): Observable<any>;
    update(id: number, data: SupportRequestModel): Observable<any>;
    delete(id: number): Observable<any>;
    reply(id: number, replyContent: string): Observable<any>;
}