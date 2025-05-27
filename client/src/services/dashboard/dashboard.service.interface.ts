import { Observable } from "rxjs";
import { AdminDashboardDto } from "./dashboard.service";

export interface IDashboardService {
    getStatsByQuarter(userId: number, quarter: number, year: number): Observable<{
        labels: string[];
        revenues: number[];
        tenants: number[];
        roomsOccupied: number;
        roomsVacant: number;
    }>;

    getSummary(): Observable<AdminDashboardDto>
}