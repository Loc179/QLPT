// dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AUTH_SERVICE, DASHBOARD_SERVICE } from '../../../constants/injection/injection.constant';
import { IDashboardService } from '../../../services/dashboard/dashboard.service.interface';
import { IAuthService } from '../../../services/auth/auth.service.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userId!: number;
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(DASHBOARD_SERVICE) private readonly dashboardService: IDashboardService
  ) {
    this.userId = this.authService.getUserId();
  }

  quarter = signal<number>(1);
  year = signal<number>(new Date().getFullYear());

  // Pie Chart
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Đang cho thuê', 'Trống'],
    datasets: [{
      data: [],
      backgroundColor: ['#3B82F6', '#EF4444'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
  pieChartType: ChartType = 'pie';

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

  // Line Chart
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Người thuê',
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: '#3B82F6',
      borderWidth: 2,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      tension: 0.4
    }]
  };
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  quarters = [1, 2, 3, 4];
  years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  ngOnInit(): void {
    this.loadStats();
  }

  // Thêm signal để track trạng thái loading và không có dữ liệu
  isLoading = signal<boolean>(false);
  hasData = signal<boolean>(true);
  
  loadStats() {
    const q = this.quarter();
    const y = this.year();
    
    this.isLoading.set(true);
    
    this.dashboardService.getStatsByQuarter(this.userId, q, y).subscribe({
      next: (res) => {
        // Kiểm tra xem có dữ liệu không
        const hasValidData = res && (
          (res.roomsOccupied > 0 || res.roomsVacant > 0) ||
          (res.revenues?.some(r => r > 0)) ||
          (res.tenants?.some(t => t > 0))
        );

        this.hasData.set(hasValidData);

        if (hasValidData) {
          // Update Pie Chart
          this.pieChartData = {
            ...this.pieChartData,
            datasets: [{
              ...this.pieChartData.datasets[0],
              data: [res.roomsOccupied || 0, res.roomsVacant || 0]
            }]
          };

          // Update Bar Chart
          this.barChartData = {
            ...this.barChartData,
            labels: res.labels || [],
            datasets: [{
              ...this.barChartData.datasets![0],
              data: res.revenues || []
            }]
          };

          // Update Line Chart
          this.lineChartData = {
            ...this.lineChartData,
            labels: res.labels || [],
            datasets: [{
              ...this.lineChartData.datasets![0],
              data: res.tenants || []
            }]
          };
        } else {
          // Reset charts với dữ liệu trống
          this.pieChartData = {
            ...this.pieChartData,
            datasets: [{
              ...this.pieChartData.datasets[0],
              data: [0, 0]
            }]
          };

          this.barChartData = {
            ...this.barChartData,
            labels: [],
            datasets: [{
              ...this.barChartData.datasets[0],
              data: []
            }]
          };

          this.lineChartData = {
            ...this.lineChartData,
            labels: [],
            datasets: [{
              ...this.lineChartData.datasets[0],
              data: []
            }]
          };
        }
        
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        this.isLoading.set(false);
        this.hasData.set(false);
        
        // Reset charts khi có lỗi
        this.resetChartsToEmpty();
      }
    });
  }

  private resetChartsToEmpty() {
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [{
        ...this.pieChartData.datasets[0],
        data: [0, 0]
      }]
    };

    this.barChartData = {
      ...this.barChartData,
      labels: [],
      datasets: [{
        ...this.barChartData.datasets![0],
        data: []
      }]
    };

    this.lineChartData = {
      ...this.lineChartData,
      labels: [],
      datasets: [{
        ...this.lineChartData.datasets![0],
        data: []
      }]
    };
  }

  onChange() {
    this.loadStats();
  }

  getOccupancyRate(): number {
    const occupied = this.pieChartData.datasets?.[0]?.data?.[0] as number || 0;
    const vacant = this.pieChartData.datasets?.[0]?.data?.[1] as number || 0;
    const total = occupied + vacant;
    
    if (total === 0) return 0;
    
    return Math.round((occupied / total) * 100);
  }
}