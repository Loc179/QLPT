import { ContractModel } from './../../models/contract/contract.model';
import { Observable } from "rxjs";
import { ContractResponseModel } from "../../models/contract/contractresponse.model";
import { PaginatedResult } from "../../models/paginated-result.model";

export interface IContractService {
  create(contract: ContractModel): Observable<any>;
  update(id: number, contract: ContractModel): Observable<any>;
  delete(id: number): Observable<any>;
  getById(id: number): Observable<ContractModel>;
  getByUserId(userId: number, page: number, pageSize: number): Observable<PaginatedResult<ContractResponseModel>>;
}