import { Observable } from "rxjs";
import { ServicePackageModel } from "../../models/servicepackage/servicepackage.model";

export interface IServicepackageService {
    getAll(): Observable<ServicePackageModel[]>;
    getById(id: number): Observable<ServicePackageModel>;
    create(data: ServicePackageModel): Observable<any>;
    update(id: number, data: ServicePackageModel): Observable<any>;
    delete(id: number): Observable<any>;
}