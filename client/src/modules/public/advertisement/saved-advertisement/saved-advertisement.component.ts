import { Component, Inject } from '@angular/core';
import { ADVERTISEMENT_SERVICE } from '../../../../constants/injection/injection.constant';
import { IAdvertisementService } from '../../../../services/advertisement/advertisement.service.interface';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { FooterComponent } from "../../home/footer/footer.component";
import { HeaderComponent } from "../../home/header/header.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PhotoLayoutComponent } from "../../../shared/photo-layout/photo-layout.component";

@Component({
  selector: 'app-saved-advertisement',
  imports: [FooterComponent, HeaderComponent, CommonModule, RouterLink, PhotoLayoutComponent],
  templateUrl: './saved-advertisement.component.html',
  styleUrl: './saved-advertisement.component.css'
})
export class SavedAdvertisementComponent {
  public advertisements: AdvertisementResponseModel[] = [];

  constructor(
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService : IAdvertisementService,
  ){
    const favoritedItems: { id: number, title: string }[] = JSON.parse(localStorage.getItem('favoritedItems') || '[]') || [];

    const ids = favoritedItems.map(item => item.id);
    console.log("ids: ", ids);

    if (ids.length > 0) {
      // Gọi API lấy dữ liệu chi tiết
      for(const id of ids)
      {
        this.advertisementService.getById(id).subscribe({
          next: (item) => {
            this.advertisements.push(item);
          },
          error: (err) => {
            console.error('Lỗi khi lấy dữ liệu favorite', err);
          },
        });

      }
    }
  }


}
