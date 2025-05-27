import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { ActivatedRoute } from '@angular/router';
import { PhotoCarouselComponent } from '../../public/advertisement/photo-carousel/photo-carousel.component';
import { AdvertisementResponseModel } from '../../../models/advertisement/advertisement-response.model';
import { Subscription } from 'rxjs';
import { ADVERTISEMENT_SERVICE } from '../../../constants/injection/injection.constant';
import { IAdvertisementService } from '../../../services/advertisement/advertisement.service.interface';


@Component({
  selector: 'app-advertisement-detail',
  imports: [CommonModule, PhotoCarouselComponent],
  templateUrl: './advertisement-detail.component.html',
  styleUrl: './advertisement-detail.component.css'
})
export class AdvertisementDetailComponent {
  public data!: AdvertisementResponseModel;
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
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.map?.remove();
  }

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
}
