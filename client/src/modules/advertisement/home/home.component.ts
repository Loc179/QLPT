import { AdvertisementFilter } from './../../../models/advertisement/advertisement-filter.model';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { IAdvertisementService } from '../../../services/advertisement/advertisement.service.interface';
import { ADVERTISEMENT_SERVICE } from '../../../constants/injection/injection.constant';
import { UserBoxComponent } from "../user-box/user-box.component";
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../shared/cards/card/card.component";
import { FormsModule } from '@angular/forms';
import { HeaderAdvertisementComponent } from "../header-advertisement/header-advertisement.component";

@Component({
  selector: 'app-home',
  imports: [UserBoxComponent, CommonModule, CardComponent, FormsModule, HeaderAdvertisementComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  adData: any[] = [];
  address: string | undefined = undefined;
  minArea: number | undefined = undefined;
  maxArea: number | undefined = undefined;
  minCost: number | undefined = undefined;
  maxCost: number | undefined = undefined;

  constructor(
    private readonly http: HttpClient,
    @Inject(ADVERTISEMENT_SERVICE) private readonly advertisementService: IAdvertisementService,
  ) {}

  ngOnInit(): void {
    this.loadAdvertisements();
  }

  onAddressChange(address: string) {
    this.address = address;
  }

  filter() {
    const filter: AdvertisementFilter = {
      address: this.address,
      areaMin: this.minArea,
      areaMax: this.maxArea,
      priceMin: this.minCost,
      priceMax: this.maxCost,
    };

    this.advertisementService.getByFilter(filter).subscribe((res) => {
      this.adData = res;
    })
  }

  loadAdvertisements() {
    this.advertisementService.getByStatus(1).subscribe((res) => {
      this.adData = res;
    });
  }
}
