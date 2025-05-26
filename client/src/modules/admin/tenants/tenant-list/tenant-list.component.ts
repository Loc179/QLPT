import { Component, Inject } from '@angular/core';
import { TenantModel } from '../../../../models/tenant/tenant.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HOUSE_SERVICE, ROOM_SERVICE, TENANT_SERVICE } from '../../../../constants/injection/injection.constant';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';
import { FormsModule } from '@angular/forms';
import { HouseModel } from '../../../../models/house/house.model';
import { RoomModel } from '../../../../models/room/room.model';
import { IHouseService } from '../../../../services/house/house.service.interface';
import { IRoomService } from '../../../../services/room/room.service.interface';

@Component({
  selector: 'app-tenant-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.css'
})
export class TenantListComponent {
  public tenants: TenantModel[] = [];
  selectedRoomId: number | null = null;
  selectedHouseId: number | null = null;
  public roomId: number | null = null;
  public houseId: number | null = null;
  public userId: number | null = null;
  houses: HouseModel[] = [];
  rooms: RoomModel[] = [];
  filteredRooms: RoomModel[] = [];
  searchText?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(TENANT_SERVICE) private readonly tenantService: ITenantService,
    @Inject(HOUSE_SERVICE) private readonly houseService: IHouseService,
    @Inject(ROOM_SERVICE) private readonly roomService: IRoomService,
  ) {
    const userInfoString = localStorage.getItem('userInformation');

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString); // Convert JSON string → object
      this.userId = userInfo.id;
    }
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['roomId']) {
        this.roomId = +params['roomId'];  // Convert to number
        this.loadTenantsByRoom(this.roomId);
      } else if (params['houseId']) {
        this.houseId = +params['houseId'];  // Convert to number
        this.loadTenantsByHouse(this.houseId);
      } else if (params['userId']) {
        this.userId = +params['userId'];  // Convert to number
        this.loadTenantsByUser(this.userId);
      }
    });

    this.loadAllHouses();
    this.loadAllRooms();
  }

  loadTenantsByRoom(roomId: number) {
    this.tenantService.getByRoomId(roomId).subscribe((tenants: TenantModel[]) => {
      this.tenants = tenants;
      console.log("Tenants by room Id: ", this.tenants);
    });
  }

  loadTenantsByHouse(houseId: number) {
    this.tenantService.getByHouseId(houseId).subscribe((tenants: TenantModel[]) => {
      this.tenants = tenants;
      console.log("Tenants by house Id: ", this.tenants);
    });
  }

  loadTenantsByUser(userId: number) {
    this.tenantService.getByUserId(userId).subscribe((tenants: TenantModel[]) => {
      this.tenants = tenants;
      console.log("Tenants by user Id: ", this.tenants);
    });
  }

  loadAllHouses() {
    this.houseService.getByUserId(this.userId!).subscribe(data => this.houses = data);
  }

  loadAllRooms() {
    this.roomService.getByUserId(this.userId!).subscribe(data => this.rooms = data);
  }
  
  deleteTenant(tenantId: number) {
    console.log("Deleting tenant with ID: ", tenantId);
    if(confirm("Are you sure you want to delete this tenant?")) {
      this.tenantService.delete(tenantId).subscribe(() => {
        this.tenants = this.tenants.filter(tenant => tenant.id !== tenantId);
        console.log("Tenant deleted: ", tenantId);
      });
    }
  }

  editTenant(tenantId: number) {
    this.router.navigate(['/admin/tenant/edit', tenantId]);
  }

  onHouseChange(houseId: number) {
    this.filteredRooms = this.rooms.filter(room => room.houseId === +this.selectedHouseId!);
    this.loadTenantsByHouse(houseId);
    this.selectedRoomId = null;
  }

  onRoomChange() {
    if (this.selectedRoomId) {
      this.loadTenantsByRoom(this.selectedRoomId);
    }
  }
  
  searchTenants() {
    this.tenantService.search(this.userId!, this.searchText ?? '').subscribe((tenants: TenantModel[]) => {
      this.tenants = tenants;
    })
  }
}
