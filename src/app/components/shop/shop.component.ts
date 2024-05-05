import {Component, Input, Signal} from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {ItemsComponent} from "../home/items/items.component";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {toSignal} from "../../utils/signals/signal.util";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ItemsComponent,
    ProductCardComponent,
    NgStyle
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  @Input({transform: toSignal})
  product!: Signal<ProductModel[]>

  display= 'flex'


}
