import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  // Quản lý trạng thái collapse cho từng menu
  collapseStates = {
    menu1: true,
    menu2: true,
    menu3: true,
  };

  toggleCollapse(menu: keyof typeof this.collapseStates) {
    this.collapseStates[menu] = !this.collapseStates[menu];
  }
}
