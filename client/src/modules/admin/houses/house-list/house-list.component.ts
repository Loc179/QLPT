import { Component, Inject } from '@angular/core';
import { HouseModel } from '../../../../models/house/house.model';
import { CommonModule } from '@angular/common';
import { HOUSE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-house-list',
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent {
  searchKeyword?: string;
  userId!: number;
  public houses: PaginatedResult<HouseModel> | null = null;

  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,

  ) { }

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInformation');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      this.userId = userInfo.id;

      console.log('User ID:', this.userId);
      if (this.userId) {
        this.onSearch();
      } else {
        alert('User ID not found.');
      }
    }
  }

  goToRoom(houseId: number) {
    this.router.navigate(['admin/room', houseId]);
  }

  gotoTenant(houseId: number) {
    this.router.navigate(['admin/tenant/house', houseId]);
  }

  editHouse(houseId: number) {
    this.router.navigate(['/admin/tenant/house/edit', houseId]);
  }

  deleteHouse(houseId: number) {
    if (confirm('Bạn có chắc chắn muốn xoá nhà này không?')) {
      this.houseService.delete(houseId).subscribe(() => {
        this.toastr.success("Xóa nhà thành công");
        this.onSearch();
      });
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.loadHouses();
  }

  // Method chính để load data với pagination
  private loadHouses() {
    this.houseService.search(
      this.userId, 
      this.searchKeyword ?? '', 
      this.currentPage, 
      this.pageSize
    ).subscribe((houses) => {
      this.houses = houses;
    });
  }

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadHouses();
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadHouses();
  }

}
