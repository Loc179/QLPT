import { Component, Inject } from '@angular/core';
import { RoomModel } from '../../../../models/room/room.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HouseModel } from '../../../../models/house/house.model';
import { IRoomService } from '../../../../services/room/room.service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { AUTH_SERVICE, HOUSE_SERVICE, ROOM_SERVICE } from '../../../../constants/injection/injection.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {
  public roomForm!: FormGroup;
  public houses: HouseModel[] = [];
  public roomId!: number;
  public userId!: number;
  public occupancyStatuses = [
    { value: 0, display: 'Available' },
    { value: 1, display: 'Occupied' },
    { value: 2, display: 'Under Maintenance' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { }

  ngOnInit(): void {
    this.roomId = +this.route.snapshot.params['roomId'];
    this.initializeForm();
    this.loadHouses();
    this.loadRoomData();
  }

  loadHouses() {
    this.authService.getUserInformation().subscribe(user => {
      if (!user) {
        console.log("User information not found");
        return;
      }
      this.userId = user.id;
    });
    this.houseService.getByUserId(this.userId).subscribe(houses => {
      this.houses = houses;
    });
  }

  loadRoomData() {
    this.roomService.getById(this.roomId).subscribe(room => {
      this.roomForm.patchValue({
        roomNumber: room.roomNumber,
        description: room.description,
        price: room.price,
        maxOccupants: room.maxOccupants,
        occupancyStatus: room.occupancyStatus,
        houseId: room.houseId
      });
    });
  }

  initializeForm(): void {
    this.roomForm = this.fb.group({
      roomNumber: ['', [Validators.required, Validators.min(1)]],
      description: [null],
      price: ['', [Validators.required, Validators.min(0)]],
      maxOccupants: ['', [Validators.required, Validators.min(1)]],
      occupancyStatus: [0, Validators.required],
      houseId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const updatedRoom: RoomModel = {
        ...this.roomForm.value,
        id: this.roomId,
      };
      console.log('Updating room:', updatedRoom);
      this.roomService.update(updatedRoom.id, updatedRoom).subscribe(() => {
        this.router.navigate(['/admin/room', this.roomForm.value.houseId]);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/room', this.roomForm.value.houseId]);
  }

  getOccupancyStatus(status: number): string {
    const statusObj = this.occupancyStatuses.find(s => s.value == status);
    return statusObj ? statusObj.display : 'Unknown';
  }

  getHouseName(houseId: number): string {
    const house = this.houses.find(h => h.id == houseId);
    return house ? house.name : 'Unknown';
  }
}
