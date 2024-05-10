import {Component} from '@angular/core';
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedElement = 'Products'

}
