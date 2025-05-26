import { Component, Inject } from '@angular/core';
import { HouseModel } from '../../../../models/house/house.model';
import { CommonModule } from '@angular/common';
import { HOUSE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-house-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent {
  searchKeyword?: string;
  userId!: number;
  public houses: HouseModel[] = [];

  constructor(
    private readonly router: Router,
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
        this.houses = this.houses.filter(house => house.id !== houseId);
      });
    }
  }

  onSearch() {
    this.houseService.search(this.userId, this.searchKeyword ?? '').subscribe((houses: HouseModel[]) => {
      this.houses = houses;
    });
  }

}
