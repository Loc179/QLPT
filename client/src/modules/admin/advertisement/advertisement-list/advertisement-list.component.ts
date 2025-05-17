import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { Router } from '@angular/router';
import { ADVERTISEMENT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAdvertisementService } from '../../../../services/advertisement/advertisement.service.interface';

@Component({
  selector: 'app-advertisement-list',
  imports: [CommonModule],
  templateUrl: './advertisement-list.component.html',
  styleUrl: './advertisement-list.component.css'
})
export class AdvertisementListComponent {
  advertisements: AdvertisementResponseModel[] = [];

  constructor(
    private readonly router: Router,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
  ) { }

  ngOnInit(): void {
    this.advertisementService.getByUserId(5).subscribe(users => {
      this.advertisements = users;
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

  getStatusLabel(status: number): string {
    switch (status) {
      case 1: return 'Đã duyệt';
      case 0: return 'Chờ duyệt';
      case -1: return 'Đã ẩn';
      default: return 'Không xác định';
    }
  }

}
