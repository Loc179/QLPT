import { Component } from '@angular/core';
import { TenantModel } from '../../../../models/tenant/tenant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenant-list',
  imports: [CommonModule],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.css'
})
export class TenantListComponent {
  tenants: TenantModel[] = [
    {
      id: 1,
      fullName: 'Lê Tuấn Anh',
      phoneNumber: '0949562357',
      email: 'htbwchi1905200@gmail.com',
      isRepresentative: true,
      roomId: 101,
    },
    {
      id: 2,
      fullName: 'Trần Thị B',
      phoneNumber: '0987654321',
      email: 'htbwchi1905200@gmail.com',
      isRepresentative: false,
      roomId: 101,
    },
    // thêm các khách thuê khác...
  ];

  getHouseNameByRoomId(roomId: number): string {
    return 'Nhà Số 1'; // sau này bạn có thể lấy từ roomService
  }

  getRoomNumberById(roomId: number): string {
    return roomId.toString(); // tạm thời dùng trực tiếp từ roomId
  }

  editTenant(tenant: TenantModel) {
    console.log('Sửa', tenant);
  }

  deleteTenant(tenant: TenantModel) {
    if (confirm(`Bạn có chắc muốn xoá ${tenant.fullName}?`)) {
      this.tenants = this.tenants.filter(t => t.id !== tenant.id);
    }
  }
}
