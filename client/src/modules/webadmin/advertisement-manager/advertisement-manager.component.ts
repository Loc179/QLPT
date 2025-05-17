import { Component } from '@angular/core';
import { AdvertisementResponseModel } from '../../../models/advertisement/advertisement-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisement-manager',
  imports: [CommonModule],
  templateUrl: './advertisement-manager.component.html',
  styleUrl: './advertisement-manager.component.css'
})
export class AdvertisementManagerComponent {
  advertisements: AdvertisementResponseModel[] = [];
  selectedImage: string | null = null;

  ngOnInit(): void {
    // Dữ liệu mẫu
    this.advertisements = [
      {
        id: 4,
        title: 'string',
        address: 'string',
        description: 'string',
        cost: 1000000,
        area: 20,
        latitude: 25,
        longitude: 30,
        maxOccupants: 3,
        status: 1,
        type: 0,
        userId: 5,
        imagesPath: []
      },
      {
        id: 7,
        title: 'Quangr cao nha tro 1',
        address: 'Cổ Nhuế 2, Bắc Từ Liêm, ',
        description: 'Dep, thoai mai',
        cost: 2000000,
        area: 40,
        latitude: 21.06553460017966,
        longitude: 105.77611014874248,
        maxOccupants: 0,
        status: 0,
        type: 2,
        userId: 5,
        imagesPath: [
          'https://res.cloudinary.com/dcqrvlar4/image/upload/v1747399042/advertisement-images/tg0bs36dj3n23blsr23q.jpg',
          'https://res.cloudinary.com/dcqrvlar4/image/upload/v1747399043/advertisement-images/mr8gqvsuriankmznlj6f.jpg'
        ]
      },
      {
        id: 8,
        title: 'ssdvsdvs',
        address: 'Tây Tựu, Bắc Từ Liêm, Hà Nội',
        description: 'sfbjsfewkjbe',
        cost: 1800000,
        area: 35,
        latitude: 21.07128968747189,
        longitude: 105.73198268243937,
        maxOccupants: 0,
        status: 0,
        type: 2,
        userId: 5,
        imagesPath: [
          'https://res.cloudinary.com/dcqrvlar4/image/upload/v1747399320/advertisement-images/oepmgwcgaq2zytjk5ptf.jpg'
        ]
      },
      {
        id: 9,
        title: 'sdmacdbd',
        address: 'Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
        description: 'd cjsnd jsh jhs ',
        cost: 2500000,
        area: 50,
        latitude: 21.037293345213413,
        longitude: 105.78604854226904,
        maxOccupants: 4,
        status: 0,
        type: 2,
        userId: 5,
        imagesPath: [
          'https://res.cloudinary.com/dcqrvlar4/image/upload/v1747407197/advertisement-images/zbautjld81hkpwbhjkno.jpg'
        ]
      }
    ];
  }

  approveAd(adId: number) {
    console.log('Duyệt quảng cáo với ID:', adId);
  }
}
