import { Component, Inject } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';
import { CommonModule } from '@angular/common';
import { USER_SERVICE } from '../../../constants/injection/injection.constant';
import { IUserService } from '../../../services/user/user.service.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-manager',
  imports: [CommonModule],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent {
  landlords: UserModel[] = [];

  constructor(
    private readonly toastr: ToastrService,
    private readonly router: Router,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.landlords = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách người dùng:', err);
      }
    });
  }

  getStatusLabel(status: number): string {
    return status === 1 ? 'Hoạt động' : 'Khóa';
  }

  onView(id: number) {
    this.router.navigate(['/webadmin/user-detail/' + id]);
  }

  onLock(id: number) {
    this.userService.banUser(id, 0).subscribe({
      next: () => {
        this.toastr.success('Ban user thành công.');
      },
      error: (err) => {
        this.toastr.error('Ban user bị lỗi.');
      }
    });

  }
}
