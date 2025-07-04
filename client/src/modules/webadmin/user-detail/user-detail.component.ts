import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USER_SERVICE } from '../../../constants/injection/injection.constant';
import { IUserService } from '../../../services/user/user.service.interface';
import { UserModel } from '../../../models/user/user.model';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  userId!: number;
  user?: UserModel;

  constructor(
    private readonly route: ActivatedRoute,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserDetail();
  }

  getUserDetail(): void {
    this.userService.getById(this.userId).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Lỗi khi lấy thông tin người dùng:', err)
    });
  }

  getServicePackageName(servicePackageId: number): string {
    if(servicePackageId === 3) {
      return 'Gói cơ bản';
    }
    if(servicePackageId === 4) {
      return 'Gói cấp cao';
    }
    if(servicePackageId === 1002) {
      return 'Gói vip';
    }

    return '';
  }
}
