import { Component, Inject } from '@angular/core';
import { TenantModel } from '../../../../models/tenant/tenant.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TENANT_SERVICE } from '../../../../constants/injection/injection.constant';
import { ITenantService } from '../../../../services/tenant/tenant.service.interface';

@Component({
  selector: 'app-tenant-list',
  imports: [CommonModule],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.css'
})
export class TenantListComponent {
  public tenants: TenantModel[] = [];
  public roomId: number | null = null;
  public houseId: number | null = null;
  public userId: number | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(TENANT_SERVICE) private readonly tenantService: ITenantService,
  ) { }

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
  }

  loadTenantsByRoom(roomId: number) {
    this.tenantService.getByRoomId(roomId).subscribe((tenants: TenantModel[]) => {
      this.tenants.push(...tenants);
      console.log("Tenants by room Id: ", this.tenants);
    });
  }

  loadTenantsByHouse(houseId: number) {
    this.tenantService.getByHouseId(houseId).subscribe((tenants: TenantModel[]) => {
      this.tenants.push(...tenants);
      console.log("Tenants by house Id: ", this.tenants);
    });
  }

  loadTenantsByUser(userId: number) {
    this.tenantService.getByUserId(userId).subscribe((tenants: TenantModel[]) => {
      this.tenants.push(...tenants);
      console.log("Tenants by user Id: ", this.tenants);
    });
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
}
