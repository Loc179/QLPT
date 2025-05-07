import { Component } from '@angular/core';
import { HouseModel } from '../../../../models/house/house.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-list',
  imports: [CommonModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent {
  houses: HouseModel[] = [
    {
      id: 1,
      name: 'Nhà Số 1',
      address: 'Đường Lương Nhữ Học, Phường 11, Quận 5, Hồ Chí Minh',
      totalRooms: 3,
      status: 1,
      createdAt: new Date(),
      userId: 1
    },
    {
      id: 2,
      name: 'Nhà Số 2',
      address: 'Đường Ni Sư Huỳnh Liên, Phường 10, Tân Bình, Hồ Chí Minh',
      totalRooms: 1,
      status: 1,
      createdAt: new Date(),
      userId: 1
    },
    {
      id: 3,
      name: 'Nhà Số 3',
      address: 'Số 50 Đường số 5, Phạm Hùng, Phường 4, Quận 8, Hồ Chí Minh',
      totalRooms: 5,
      status: 0,
      createdAt: new Date(),
      userId: 1
    }
  ];
}
