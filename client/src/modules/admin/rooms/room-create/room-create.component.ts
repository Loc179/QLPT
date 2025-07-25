import { Component, Inject } from '@angular/core';
import { RoomModel } from '../../../../models/room/room.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AUTH_SERVICE, HOUSE_SERVICE, ROOM_SERVICE } from '../../../../constants/injection/injection.constant';
import { IRoomService } from '../../../../services/room/room.service.interface';
import { HouseModel } from '../../../../models/house/house.model';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { IAuthService } from '../../../../services/auth/auth.service.interface';
import { PaginatedResult } from '../../../../models/paginated-result.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-create',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent {
  public roomForm!: FormGroup;
  public houses: PaginatedResult<HouseModel> = new PaginatedResult<HouseModel>();
  public userId: number = 0;
  public occupancyStatuses = [
    { value: 0, display: 'Đang trống' },
    { value: 1, display: 'Đang sử dụng' },
    { value: 2, display: 'Đang bảo trì' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadHouses();
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

  initializeForm(): void {
    this.roomForm = this.fb.group({
      roomNumber: [ null, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),   // Chỉ chấp nhận số nguyên dương
        Validators.min(1)]],
      description: [null],
      price: [null, [Validators.required, Validators.min(0)]],
      maxOccupants: [null, [Validators.required, Validators.min(1)]],
      occupancyStatus: [0, Validators.required],
      houseId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const newRoom: RoomModel = {
        ...this.roomForm.value,
      };
      console.log('Submitting room:', newRoom);
      this.roomService.create(newRoom).subscribe(
        (response) => {
          this.toastr.success('Tạo phòng thành công');
          this.router.navigate(['/admin/room', response.houseId]);
        },
        (error) => {
          console.error('Error creating room:', error);
          this.toastr.warning('Tạo phòng thất bại');
        }
      );
    }
  }

  onCancel(): void {
    console.log('Form cancelled');
    this.roomForm.reset({
      occupancyStatus: 0
    });
  }
}
