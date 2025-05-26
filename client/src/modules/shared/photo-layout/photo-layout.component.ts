import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-layout',
  imports: [CommonModule],
  templateUrl: './photo-layout.component.html',
  styleUrl: './photo-layout.component.css'
})
export class PhotoLayoutComponent {
  @Input() imagesPath: string[] = [];
}
