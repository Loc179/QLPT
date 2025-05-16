import { Component, Inject } from '@angular/core';
import { HouseModel } from '../../../../models/house/house.model';
import { CommonModule } from '@angular/common';
import { HOUSE_SERVICE } from '../../../../constants/injection/injection.constant';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-house-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent {
  public houses: HouseModel[] = [];

  constructor(
    private readonly router: Router,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,

  ) { }

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInformation');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      const userId = userInfo.id;

      console.log('User ID:', userId);
      if (userId) {
        this.houseService.getByUserId(+userId).subscribe((houses: HouseModel[]) => {
          this.houses.push(...houses);
          console.log("House by user Id: ",this.houses);
        });
      } else {
        alert('User ID not found.');
      }
    }
  }

  goToRoom(houseId: number) {
    this.router.navigate(['admin/room', houseId]);
    console.log("clicked room", houseId);
  }

  editHouse(houseId: number) {
    this.router.navigate(['/admin/house/edit', houseId]);
  }

deleteHouse(houseId: number) {
  if (confirm('Bạn có chắc chắn muốn xoá nhà này không?')) {
    this.houseService.delete(houseId).subscribe(() => {
      this.houses = this.houses.filter(house => house.id !== houseId);
    });
  }
}

}
