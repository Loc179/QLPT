import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RoomModel } from '../../../../models/room/room.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HOUSE_SERVICE, ROOM_SERVICE } from '../../../../constants/injection/injection.constant';
import { IRoomService } from '../../../../services/room/room.service.interface';
import { FormsModule } from '@angular/forms';
import { HouseModel } from '../../../../models/house/house.model';
import { IHouseService } from '../../../../services/house/house.service.interface';

@Component({
  selector: 'app-room-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  filteredRoomList: RoomModel[] = [];
  selectedHouseId: number | null = null;
  selectedRoomId: number | null = null;
  
  houseList: HouseModel[] = [];
  public roomsList: RoomModel[] = [];
  public rooms: RoomModel[] = [];
  public houseId: number | null = null;
  public userId!: number;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,

  ) { }

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInformation');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      this.userId = userInfo.id;
    }

    this.route.params.subscribe(params => {
      console.log("Params: ", params);
      if (params['houseId']) {
        this.houseId = +params['houseId'];
        this.loadRoomsByHouse(this.houseId);
      } else if (params['userId']) {
        this.userId = +params['userId'];
        this.loadRoomsByUser(this.userId);
      }
    });

    this.fetchHouses();
  }

  loadRoomsByUser(userId: number) {
    this.roomService.getByUserId(+userId).subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
      console.log("Rooms by user Id: ", this.rooms);
    });
  }

  loadRoomsByHouse(houseId: number) {
    this.roomService.getByHouseId(houseId).subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
      this.roomsList = rooms;
    });
  }

  fetchHouses() {
    this.houseService.getByUserId(this.userId).subscribe(data => {
      this.houseList = data;
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
  
  onHouseChange() {
    if (this.selectedHouseId) {
      // Gọi lại API để lấy room chính xác cho house này
      this.loadRoomsByHouse(this.selectedHouseId);
      this.selectedRoomId = null;
    } else {
      this.filteredRoomList = [];
    }
  }
  
  getByRoomId(id: number|null) {
    if (id !== null) {
    this.roomService.getById(id).subscribe((room: RoomModel) => {
      this.rooms = [room]; // Gán lại thành mảng 1 phần tử
    });
  }
  }

}
