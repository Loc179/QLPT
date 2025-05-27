import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { Router } from '@angular/router';
import { ADVERTISEMENT_SERVICE, AUTH_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAdvertisementService } from '../../../../services/advertisement/advertisement.service.interface';
import { FormsModule } from '@angular/forms';
import { IAuthService } from '../../../../services/auth/auth.service.interface';

@Component({
  selector: 'app-advertisement-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './advertisement-list.component.html',
  styleUrl: './advertisement-list.component.css'
})
export class AdvertisementListComponent {
  advertisements: AdvertisementResponseModel[] = [];
  selectedStatus: number | null = null;

  constructor(
    private readonly router: Router,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) { }

  ngOnInit(): void {
    this.loadAdvertisement();
  }

  loadAdvertisement() {
    this.advertisementService.getByUserId(this.authService.getUserId()).subscribe(data => {
      this.advertisements = data;
    })
  }

  view(id: number) {
    this.router.navigate(['/admin/advertisement/detail', id]);
  }

  edit(id: number) {
    this.router.navigate(['/admin/advertisement/edit', id]);
  }

  delete(id: number) {
    this.advertisementService.delete(id).subscribe(() => {
      this.advertisements = this.advertisements.filter(req => req.id !== id);
    })
  }
  
  createNew() {
    this.router.navigate(['/admin/advertisement/create']);
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1: return 'Đã duyệt';
      case 0: return 'Chờ duyệt';
      case -1: return 'Đã ẩn';
      default: return 'Không xác định';
    }
  }

  filterByStatus() {
    if(this.selectedStatus == null)
    {
      this.loadAdvertisement();
    } else {
      this.advertisementService.getByStatus(this.selectedStatus).subscribe(data => {
        this.advertisements = data;
      })
    }
  }
}
