import {Component, Input, OnInit, output, signal, Signal} from '@angular/core';
import {ImageCardComponent} from "../image-card/image-card.component";
import {toSignal} from "../../utils/signals/signal.util";
import {ProductModel} from "../../models/product.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    ImageCardComponent,
    NgClass
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input({transform: toSignal})
  imageDimentions: Signal<number[]> = signal([360, 280])
  @Input({transform: toSignal})
  product!: Signal<ProductModel>
  stars: string[] = [];
  check = output<void>();
  addTocart = output<void>();


  ngOnInit() {
    this.renderRating();
  }

  renderRating() {
    this.stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(this.product().rating)) {
        this.stars.push('filled');
      } else {
        this.stars.push('empty');
      }
    }
  }


}
