import { Observable } from "rxjs";
import { SupportRequestModel } from "../../models/supportrequest/supportrequest.model";

export interface ISupportrequestService {
    getAll(): Observable<SupportRequestModel[]>;
    getById(id: number): Observable<SupportRequestModel>;
    getByUserId(userId: number): Observable<SupportRequestModel[]>;
    create(data: SupportRequestModel): Observable<any>;
    update(id: number, data: SupportRequestModel): Observable<any>;
    delete(id: number): Observable<any>;
    reply(id: number, replyContent: string): Observable<any>;
}