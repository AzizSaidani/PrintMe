import {Component, EventEmitter, Input, Output, Signal} from '@angular/core';
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

  @Input({transform: toSignal})
  imageDimentions!: Signal<number[]>

  @Output() check = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() addToWishes = new EventEmitter<void>();

}
