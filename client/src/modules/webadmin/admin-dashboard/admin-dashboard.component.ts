// admin-dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DASHBOARD_SERVICE } from '../../../constants/injection/injection.constant';
import { IDashboardService } from '../../../services/dashboard/dashboard.service.interface';
import { firstValueFrom } from 'rxjs';

interface MonthlyRevenueDto {
  month: string;
  revenue: number;
}

interface AdminDashboardDto {
  totalLandlords: number;
  totalAds: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenueDto[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: `./admin-dashboard.component.html`,
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  data = signal<AdminDashboardDto>({
    totalLandlords: 0,
    totalAds: 0,
    totalRevenue: 0,
    monthlyRevenue: []
  });

  // Bar Chart
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Doanh thu',
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: '#3B82F6',
      borderWidth: 1
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(value as number);
          }
        }
      }
    }
  };

  // Pie Chart
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Chủ trọ', 'Quảng cáo'],
    datasets: [{
      data: [],
      backgroundColor: ['#10B981', '#3B82F6'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
  pieChartType: ChartType = 'pie';

  constructor(
    private readonly http: HttpClient,
    @Inject(DASHBOARD_SERVICE) private readonly dashboardService: IDashboardService,
   ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  async loadDashboardData(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.hasError.set(false);
      this.errorMessage.set('');

      // Gọi API thực tế thông qua service
      const response = await firstValueFrom(this.dashboardService.getSummary());
      
      this.data.set(response);
      this.updateCharts(response);
      this.isLoading.set(false);

    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      this.hasError.set(true);
      this.isLoading.set(false);
      
      // Xử lý error message chi tiết
      if (error?.error?.message) {
        this.errorMessage.set(error.error.message);
      } else if (error?.message) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set('Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.');
      }
    }
  }

  private updateCharts(data: AdminDashboardDto): void {
    // Update Bar Chart
    this.barChartData = {
      ...this.barChartData,
      labels: data.monthlyRevenue.map(item => item.month),
      datasets: [{
        ...this.barChartData.datasets![0],
        data: data.monthlyRevenue.map(item => item.revenue)
      }]
    };

    // Update Pie Chart
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [{
        ...this.pieChartData.datasets[0],
        data: [data.totalLandlords, data.totalAds]
      }]
    };
  }

  formatMoney(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  // Method để retry khi có lỗi
  retryLoadData(): void {
    this.loadDashboardData();
  }
}