import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  selectedSlide = 1

  changeSlide(index: number) {
    if (this.selectedSlide + index === 4) {
      this.selectedSlide = 1
    } else if (this.selectedSlide + index === 0) {
      this.selectedSlide = 3
    } else {
      this.selectedSlide += index
    }
  }


}
