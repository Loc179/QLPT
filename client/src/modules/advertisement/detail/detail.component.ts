import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { IAdvertisementService } from '../../../services/advertisement/advertisement.service.interface';
import { ADVERTISEMENT_SERVICE } from '../../../constants/injection/injection.constant';
import { CommonModule } from '@angular/common';
import { AdvertisementResponseModel } from '../../../models/advertisement/advertisement-response.model';
import { PhotoCarouselComponent } from "../../public/advertisement/photo-carousel/photo-carousel.component";
import { HeaderComponent } from "../../public/home/header/header.component";
import { FooterComponent } from "../../public/home/footer/footer.component";

@Component({
  selector: 'app-detail',
  imports: [CommonModule, PhotoCarouselComponent, HeaderComponent, FooterComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  public data!: AdvertisementResponseModel;
  public isShareOpen = false;
  public isFavorited = false;
  private sub!: Subscription;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  private map!: mapboxgl.Map;

  constructor(
    private readonly route: ActivatedRoute,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.sub = this.advertisementService.getById(id).subscribe(ad => {
      this.data = ad;
      this.initMap();
      this.checkFavorite();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.map?.remove();
  }

  // Mapbox
  private initMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2RxdWFuZzEyMyIsImEiOiJjbTQ3MTM0MmwwMG4yMmtxdDRobmVyOHVmIn0.hrH5j4eH6vKC0J_godgWWQ';
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.data.longitude, this.data.latitude],
      zoom: 12,
    });
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    new mapboxgl.Marker().setLngLat([this.data.longitude, this.data.latitude]).addTo(this.map);
  }

  // Share
  toggleShare() {
    this.isShareOpen = !this.isShareOpen;
  }

  shareTo(platform: 'facebook' | 'zalo') {
    const url = encodeURIComponent(window.location.href);
    console.log("URL: ",url);
    const text = encodeURIComponent(this.data.title);
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else {
      shareUrl = `https://zalo.me/share?url=${url}&text=${text}`;
    }
    this.isShareOpen = false;
    window.open(shareUrl, '_blank');
  }

  // Favorite
  checkFavorite() {
    const favs = JSON.parse(localStorage.getItem('favoritedItems') || '[]');
    this.isFavorited = favs.some((f: any) => f.id === this.data.id);
  }

  toggleFavorite() {
    let favs = JSON.parse(localStorage.getItem('favoritedItems') || '[]');
    if (this.isFavorited) {
      favs = favs.filter((f: any) => f.id !== this.data.id);
    } else {
      favs.push({ id: this.data.id, title: this.data.title });
    }
    localStorage.setItem('favoritedItems', JSON.stringify(favs));
    this.isFavorited = !this.isFavorited;
  }
}
