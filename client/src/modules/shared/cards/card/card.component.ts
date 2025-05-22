import { Component, Input } from '@angular/core';
import { AdvertisementResponseModel } from '../../../../models/advertisement/advertisement-response.model';
import { VipCardComponent } from "../vip-card/vip-card.component";
import { NormalCardComponent } from "../normal-card/normal-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [VipCardComponent, NormalCardComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() data!: AdvertisementResponseModel;
}
