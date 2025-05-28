import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RoomModel } from '../../../../models/room/room.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HOUSE_SERVICE, ROOM_SERVICE } from '../../../../constants/injection/injection.constant';
import { IRoomService } from '../../../../services/room/room.service.interface';
import { FormsModule } from '@angular/forms';
import { HouseModel } from '../../../../models/house/house.model';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { PaginationComponent } from "../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-room-list',
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  filteredRoomList: RoomModel[] = [];
  selectedHouseId: number | null = null;
  selectedRoomId: number | null = null;
  
  houseList: PaginatedResult<HouseModel> | null = null;
  public roomsList: PaginatedResult<RoomModel> | null = null;
  public rooms: PaginatedResult<RoomModel> | null = null;
  public houseId: number | null = null;
  public userId!: number;

  currentPage: number = 1;
  pageSize: number = 10;
  
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
    this.roomService.getByUserId(+userId, this.currentPage, this.pageSize).subscribe((rooms) => {
      this.rooms = rooms;
      console.log("Rooms by user Id: ", this.rooms);
    });
  }

  loadRoomsByHouse(houseId: number) {
    this.roomService.getByHouseId(houseId, this.currentPage, this.pageSize).subscribe((rooms) => {
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
        this.loadRoomsByUser(this.userId);
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
        if (this.rooms) {
          this.rooms.items = [room]; // Gán lại thành mảng 1 phần tử
        }
      });
    }
  }

  // Xử lý khi user click chuyển trang
  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadRoomsByUser(this.userId);
  }

  // Xử lý khi user thay đổi page size
  onPageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang 1 khi thay đổi page size
    this.loadRoomsByUser(this.userId);
  }

}
