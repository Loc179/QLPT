import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RoomModel } from '../../../../models/room/room.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ROOM_SERVICE } from '../../../../constants/injection/injection.constant';
import { IRoomService } from '../../../../services/room/room.service.interface';

@Component({
  selector: 'app-room-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  public rooms: RoomModel[] = [];
  public houseId: number | null = null;
  public userId: number | null = null;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("Params: ", params);
      if (params['houseId']) {
        this.houseId = +params['houseId'];  // Convert to number
        this.loadRoomsByHouse(this.houseId);
      } else if (params['userId']) {
        this.userId = +params['userId'];  // Convert to number
        this.loadRoomsByUser(this.userId);
      }
    });
  }

  loadRoomsByUser(userId: number) {
    this.roomService.getByUserId(+userId).subscribe((rooms: RoomModel[]) => {
      this.rooms.push(...rooms);
      console.log("Rooms by user Id: ", this.rooms);
    });
  }
  loadRoomsByHouse(houseId: number) {
    this.roomService.getByHouseId(houseId).subscribe((rooms: RoomModel[]) => {
      this.rooms.push(...rooms);
      console.log("Rooms by house Id: ", this.rooms);
    });
  }
  
  goToAddTenant(roomId: number) {
    this.router.navigate(['/admin/tenant/create', roomId]);
  }


  deleteRoom(roomId: number) {
    if(confirm("Are you sure you want to delete this room?")) {
      this.roomService.delete(roomId).subscribe(() => {
        this.rooms = this.rooms.filter(room => room.id !== roomId);
        console.log("Room deleted: ", roomId);
      });
    }
  }

  editRoom(roomId: number) {
    this.router.navigate(['/admin/room/edit', roomId]);
  }

  detailRoom(roomId: number) {
    this.router.navigate(['/admin/room/detail', roomId]);
  }

}
