import {Component, Input, Signal} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgOptimizedImage} from "@angular/common";
import {toSignal} from "../../utils/signals/signal.util";

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [
    CardComponent,
    NgOptimizedImage
  ],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  @Input({transform: toSignal})
  imagePath!: Signal<string>

}
