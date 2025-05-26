import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-carousel',
  imports: [CommonModule],
  templateUrl: './photo-carousel.component.html',
  styleUrl: './photo-carousel.component.css'
})
export class PhotoCarouselComponent {
  @Input() images: string[] = [];
  currentIndex = 0;

  selectImage(index: number) {
    this.currentIndex = index;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
