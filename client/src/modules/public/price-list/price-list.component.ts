import { Component } from '@angular/core';
import { HeaderComponent } from "../home/header/header.component";
import { FooterComponent } from "../home/footer/footer.component";

@Component({
  selector: 'app-price-list',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent {

}
