import { Component, Inject } from '@angular/core';
import { HeaderComponent } from "../../../public/home/header/header.component";
import { RouterLink } from '@angular/router';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { CommonModule } from '@angular/common';
import { ADVERTISEMENT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAdvertisementService } from '../../../../services/advertisement/advertisement.service.interface';
import { FooterComponent } from "../../home/footer/footer.component";
import { PhotoLayoutComponent } from "../../../shared/photo-layout/photo-layout.component";
import { FilterComponent } from "../filter/filter.component";
import { AdvertisementFilter } from '../../../../models/advertisement/advertisement-filter.model';
import { min } from 'rxjs';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-advertisement-home',
  imports: [HeaderComponent, RouterLink, CommonModule, FooterComponent, PhotoLayoutComponent, FilterComponent, PaginationComponent],
  templateUrl: './advertisement-home.component.html',
  styleUrl: './advertisement-home.component.css'
})
export class AdvertisementHomeComponent {
  showFilter = false;
  public advertisements!: PaginatedResult<AdvertisementResponseModel>;
  public advertisementsFilter!: AdvertisementFilter;

  currentPage: number = 1;
  pageSize: number = 10;

  priceRanges = [
  { label: 'Dưới 1 triệu', min: 0, max: 1000000 },
  { label: 'Từ 1 - 2 triệu', min: 1000000, max: 2000000 },
  { label: 'Từ 2 - 3 triệu', min: 2000000, max: 3000000 },
  { label: 'Từ 3 - 5 triệu', min: 3000000, max: 5000000 },
  { label: 'Từ 5 - 7 triệu', min: 5000000, max: 7000000 },
  { label: 'Từ 7 - 10 triệu', min: 7000000, max: 10000000 },
  { label: 'Từ 10 - 15 triệu', min: 10000000, max: 15000000 },
  { label: 'Trên 15 triệu', min: 15000000, max: 99999999 }
];

  areaRanges = [
    { label: 'Dưới 20 m²', min: 0, max: 20 },
    { label: 'Từ 20 - 30m²', min: 20, max: 30 },
    { label: 'Từ 30 - 50m²', min: 30, max: 50 },
    { label: 'Từ 50 - 70m²', min: 50, max: 70 },
    { label: 'Từ 70 - 90m²', min: 70, max: 90 },
    { label: 'Trên 90m²', min: 90, max: 999 }
  ];

  constructor(
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService : IAdvertisementService,
  ){
    this.loadAdvertisement();
  }

  loadAdvertisement(){
    this.advertisementService.getByStatus(1, this.currentPage, this.pageSize).subscribe(data => {
      this.advertisements = data;
    })
  }


  onApplyFilter(filterData: AdvertisementFilter) {
    console.log("Filter data: ", filterData)
    this.advertisementService.getByFilter(filterData, this.currentPage, this.pageSize).subscribe(data => {
      this.advertisements = data;
    })
    this.showFilter = false; // đóng modal sau khi áp dụng
  }

  filterByPrice(range: { min: number, max: number }) {
    this.advertisementsFilter = {
      address: '',
      areaMin: 0,
      areaMax: 0,
      priceMin: range.min,
      priceMax: range.max,
    };
    this.advertisementService.getByFilter(this.advertisementsFilter, this.currentPage, this.pageSize).subscribe(data => {
      this.advertisements = data;
    })
  }

  filterByArea(range: { min: number, max: number }) {
    this.advertisementsFilter = {
      address: '',
      areaMin: range.min,
      areaMax: range.max,
      priceMin: 0,
      priceMax: 0,
    };
    this.advertisementService.getByFilter(this.advertisementsFilter).subscribe(data => {
      this.advertisements = data;
    })
  }

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadAdvertisement();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadAdvertisement();
  }

}
