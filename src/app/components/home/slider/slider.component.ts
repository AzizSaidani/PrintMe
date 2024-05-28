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
  selectedSlide = true


  navigate(){
    window.location.assign('shop')
  }


}
