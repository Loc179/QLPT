import { Observable } from "rxjs";

export interface IServicepackageInvoiceService {
    create(queryParams: any): Observable<any>;
}