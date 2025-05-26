import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Pie Chart
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Đang cho thuê', 'Trống'],
    datasets: [{
      data: [32, 8]
    }]
  };
  pieChartType: ChartType = 'pie';

  // Bar Chart
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    datasets: [
      { data: [4_000_000, 5_500_000, 6_200_000], label: 'Doanh thu' }
    ]
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = { 
    responsive: true 
  };

  // Line Chart
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['T1', 'T2', 'T3', 'T4'],
    datasets: [
      { data: [10, 20, 30, 50], label: 'Người thuê', fill: true }
    ]
  };
  lineChartOptions: ChartConfiguration<'line'>['options'] = { 
    responsive: true 
  };

  
  stackedBarOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  };
}