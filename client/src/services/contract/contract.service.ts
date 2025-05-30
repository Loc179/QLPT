import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContractService } from './contract.service.interface';
import { Observable } from 'rxjs';
import { ContractResponseModel } from '../../models/contract/contractresponse.model';
import { PaginatedResult } from '../../models/paginated-result.model';
import { ContractModel } from '../../models/contract/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService implements IContractService {
  private readonly apiUrl: string = 'http://localhost:5297/api/contract';

  constructor(private readonly httpClient: HttpClient) { }
  create(contract: ContractModel): Observable<any> {
    return this.httpClient.post(this.apiUrl, contract);
  }
  update(id: number, contract: ContractModel): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, contract);
  }
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
  getById(id: number): Observable<ContractModel> {
    return this.httpClient.get<ContractModel>(`${this.apiUrl}/${id}`);
  }
  getByUserId(userId: number, page: number, pageSize: number): Observable<PaginatedResult<ContractResponseModel>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    return this.httpClient.get<PaginatedResult<ContractResponseModel>>(`${this.apiUrl}/by-user/${userId}`, { params });
  }


}
