import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface MonthlyRevenueDto {
  month: string;
  revenue: number;
}

export interface AdminDashboardDto {
  totalLandlords: number;
  totalAds: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenueDto[];
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private readonly apiUrl: string = 'http://localhost:5297/api/dashboard';

  constructor(private readonly httpClient: HttpClient) { }
  getStatsByQuarter(userId: number, quarter: number, year: number): Observable<{
  labels: string[];
  revenues: number[];
  tenants: number[];
  roomsOccupied: number;
  roomsVacant: number;
  }> {
    return this.httpClient.get<any>(`${this.apiUrl}/quarterly?userId=${userId}&quarter=${quarter}&year=${year}`);
  }

  getSummary(): Observable<AdminDashboardDto> {
    return this.httpClient.get<AdminDashboardDto>(`${this.apiUrl}/admin`);
  }
}
