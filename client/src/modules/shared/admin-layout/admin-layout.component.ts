import { Component } from '@angular/core';
import { HeaderComponent } from '../common/nav/header/header.component';
import { SidebarComponent } from '../common/nav/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  
}
