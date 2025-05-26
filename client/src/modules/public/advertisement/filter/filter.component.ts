import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocationModel } from '../../../../models/advertisement/location.model';

interface Range {
  label: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  private readonly API_PROVINCES = 'https://esgoo.net/api-tinhthanh/1/0.htm';
  private readonly API_DISTRICTS = 'https://esgoo.net/api-tinhthanh/2/';
  private readonly API_WARDS = 'https://esgoo.net/api-tinhthanh/3/';

   provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  // 👉 chỉ lưu ID thay vì object
  selectedProvinceId: string = '';
  selectedDistrictId: string = '';
  selectedWardId: string = '';

  selectedPrice = '';
  selectedArea = '';
  priceMin = 0;
  priceMax = 0;
  areaMin = 0;
  areaMax = 0;

  @Output() close = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<any>();

  isClosing = false;

  priceRanges: Range[] = [
    { label: 'Dưới 1 triệu', min: 0, max: 1000000 },
    { label: '1 - 3 triệu', min: 1000000, max: 3000000 },
    { label: '3 - 5 triệu', min: 3000000, max: 5000000 },
    { label: 'Trên 5 triệu', min: 5000000, max: 999999999 },
  ];

  areaRanges: Range[] = [
    { label: 'Dưới 20m²', min: 0, max: 20 },
    { label: '20 - 40m²', min: 20, max: 40 },
    { label: '40 - 60m²', min: 40, max: 60 },
    { label: 'Trên 60m²', min: 60, max: 999 },
  ];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(this.API_PROVINCES).subscribe(res => {
      this.provinces = res.data || [];
    });
  }

  onProvinceChange() {
    this.selectedDistrictId = '';
    this.selectedWardId = '';
    this.districts = [];
    this.wards = [];

    if (!this.selectedProvinceId) return;

    this.http.get<any>(`${this.API_DISTRICTS}${this.selectedProvinceId}.htm`).subscribe(res => {
      this.districts = res.data || [];
    });
  }

  onDistrictChange() {
    this.selectedWardId = '';
    this.wards = [];

    if (!this.selectedDistrictId) return;

    this.http.get<any>(`${this.API_WARDS}${this.selectedDistrictId}.htm`).subscribe(res => {
      this.wards = res.data || [];
    });
  }

  onApply() {
    const province = this.provinces.find(p => p.id === this.selectedProvinceId)?.name || '';
    const district = this.districts.find(d => d.id === this.selectedDistrictId)?.name || '';
    const ward = this.wards.find(w => w.id === this.selectedWardId)?.name || '';

    this.onFilter.emit({
      address: [ward, district, province].filter(Boolean).join(', '),
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      areaMin: this.areaMin,
      areaMax: this.areaMax,
    });
  }

  selectPriceRange(price: Range) {
    this.selectedPrice = price.label;
    this.priceMin = price.min;
    this.priceMax = price.max;
  }

  selectAreaRange(area: Range) {
    this.selectedArea = area.label;
    this.areaMin = area.min;
    this.areaMax = area.max;
  }

  onClose() {
    this.isClosing = true;
    setTimeout(() => this.close.emit(), 500);
  }
}
