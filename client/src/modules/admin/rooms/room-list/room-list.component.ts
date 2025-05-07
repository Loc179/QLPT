import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomModel } from '../../../../models/room/room.model';

@Component({
  selector: 'app-room-list',
  imports: [CommonModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  rooms: RoomModel[] = [
    {
      id: 1,
      roomNumber: 101,
      description: 'Phòng rộng thoáng',
      price: 1500000,
      maxOccupants: 2,
      occupancyStatus: 1,
      createdAt: new Date(),
      houseId: 1
    },
    {
      id: 2,
      roomNumber: 102,
      description: 'Phòng gác lửng',
      price: 1800000,
      maxOccupants: 2,
      occupancyStatus: 1,
      createdAt: new Date(),
      houseId: 1
    },
    {
      id: 3,
      roomNumber: 103,
      description: 'Phòng ban công',
      price: 2000000,
      maxOccupants: 3,
      occupancyStatus: 1,
      createdAt: new Date(),
      houseId: 1
    }
  ];
}
