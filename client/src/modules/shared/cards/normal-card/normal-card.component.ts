import { Component, Input, OnInit } from '@angular/core';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { ImageModel } from '../../../../models/advertisement/image.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-normal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './normal-card.component.html',
  styleUrls: ['./normal-card.component.css']
})
export class NormalCardComponent implements OnInit {
  @Input() data!: AdvertisementResponseModel;
  // data: AdvertisementResponseModel={
  //   id: 1,
  //   title: "Phòng cho thuê gần trung tâm",
  //   description: "Phòng rộng rãi, có đầy đủ tiện nghi, an ninh tốt.",
  //   address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
  //   cost: 3500000,
  //   area: 30,
  //   latitude: 10.776530,
  //   longitude: 106.700981,
  //   userId: 101,
  //   fullname: "Nguyễn Văn A",
  //   phonenumber: "0987654321",
  //   type: 1,
  //   status: 1,
  //   maxOccupants: 2,
  //   createAt: new Date("2025-05-18T10:00:00"),
  //   imagesPath: [
  //     "assets/images/no-photo-available.jpg",
  //     "assets/images/no-photo-available.jpg",
  //     "assets/images/no-photo-available.jpg"
  //   ]
  // };


  btnState = false;
  defaultImages: ImageModel[] = [
    { id: 'default1', image_path: 'assets/images/no_photo_available.png' },
    { id: 'default2', image_path: 'assets/images/no_photo_available.png' },
    { id: 'default3', image_path: 'assets/images/no_photo_available.png' },
  ];

  imagesToShow: string[] = [];

  ngOnInit(): void {
    // Kiểm tra trạng thái yêu thích
    const favoritedItems: AdvertisementResponseModel[] = JSON.parse(localStorage.getItem('favoritedItems') || '[]');
    this.btnState = favoritedItems.some(item => item.id === this.data.id);

    const defaultImagePaths = this.defaultImages.map(img => img.image_path);
    const result = [...(this.data?.imagesPath ?? []), ...defaultImagePaths].slice(0, 3);
    this.imagesToShow = result;
  }

  handleLikeItem(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const favoriteItem = {
      id: this.data.id,
      title: this.data.title,
      image: this.data.imagesPath && this.data.imagesPath.length > 0
        ? this.data.imagesPath
        : 'assets/images/no_photo_available.png',
    };

    let favoritedItems: any[] = JSON.parse(localStorage.getItem('favoritedItems') || '[]');

    const index = favoritedItems.findIndex(item => item.id === favoriteItem.id);

    if (index === -1) {
      favoritedItems.push(favoriteItem);
    } else {
      favoritedItems.splice(index, 1);
    }

    localStorage.setItem('favoritedItems', JSON.stringify(favoritedItems));
    this.btnState = !this.btnState;
  }
}
