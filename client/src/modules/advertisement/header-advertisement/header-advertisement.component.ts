import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-advertisement',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-advertisement.component.html',
  styleUrl: './header-advertisement.component.css'
})
export class HeaderAdvertisementComponent {

}
