import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input()
  cartItems: ProductModel[] = [
    {
      price: '500',
      imagePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug',
      description: 'White / Ceramic'
    }, {
      price: '500',
      imagePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug',
      description: 'White / Ceramic'

    }, {
      price: '500',
      imagePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug',
      description: 'White / Ceramic'

    }
  ]
}
