import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { images } from '../../../../constants/images';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { ImageModel } from '../../../../models/advertisement/image.model';

@Component({
  selector: 'app-vip-card',
  imports: [CommonModule],
  templateUrl: './vip-card.component.html',
  styleUrl: './vip-card.component.css'
})
export class VipCardComponent {
  // @Input() data!: AdvertisementResponseModel;
  data: AdvertisementResponseModel={
    id: 1,
    title: "Phòng cho thuê gần trung tâm",
    description: "Phòng rộng rãi, có đầy đủ tiện nghi, an ninh tốt.",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    cost: 3500000,
    area: 30,
    latitude: 10.776530,
    longitude: 106.700981,
    userId: 101,
    fullname: "Nguyễn Văn A",
    phonenumber: "0987654321",
    type: 1,
    status: 1,
    maxOccupants: 2,
    createAt: new Date("2025-05-18T10:00:00"),
    imagesPath: [
      "assets/images/no-photo-available.jpg",
      "assets/images/no-photo-available.jpg",
      "assets/images/no-photo-available.jpg"
    ]
  };

  btnState = false;
  images = images;

  imagesToShow: string[] = [];

  defaultImages: ImageModel[] = Array.from({ length: 4 }, (_, i) => ({
    id: `default${i + 1}`,
    image_path: this.images.no_photo_available,
  }));

  ngOnInit(): void {
    const favoritedItems = JSON.parse(localStorage.getItem('favoritedItems') || '[]');
    this.btnState = favoritedItems.some((item: any) => item.id === this.data.id);

    const defaultImagePaths = this.defaultImages.map(img => img.image_path);
    const result = [...(this.data?.imagesPath ?? []), ...defaultImagePaths].slice(0, 4);
    this.imagesToShow = result;
  }

  handleLikeItem(event: Event): void {
    event.preventDefault();
    const favoriteItem = {
      id: this.data.id,
      title: this.data.title,
      image: this.data.imagesPath || images.no_photo_available,
    };

    let favoritedItems = JSON.parse(localStorage.getItem('favoritedItems') || '[]');
    const index = favoritedItems.findIndex((item: any) => item.id === favoriteItem.id);

    if (index >= 0) {
      favoritedItems.splice(index, 1);
    } else {
      favoritedItems.push(favoriteItem);
    }

    localStorage.setItem('favoritedItems', JSON.stringify(favoritedItems));
    this.btnState = !this.btnState;
  }
}
