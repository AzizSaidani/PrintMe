import {Component, Input, OnDestroy, output, signal} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {ImageCardComponent} from "../image-card/image-card.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CategoryModel} from "../../models/category.model";
import {ProductModel} from "../../models/product.model";
import {RouterLink} from "@angular/router";
import {toSignal} from "../../utils/signals/signal.util";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageCardComponent,
    ProductCardComponent,
    NgClass,
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnDestroy {
  @Input({transform: toSignal})
  userName = signal('')
  logout = output<void>();


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

  showCart = false;
  cartItemsTotalPrice = 0

  userLogout(){
    this.logout.emit()
  }

  total() {
    this.cartItemsTotalPrice = 0
    for (let i = 0; i <= this.cartItems.length; i++) {
      this.cartItemsTotalPrice += parseInt(this.cartItems[i].price)
    }

  }

  imagePaths = [
    'assets/images/cup.png',
    'assets/images/shirt.png',
  ];
  currentImagePath = this.imagePaths[0];
  currentIndex = 0;
  interval: any;

  constructor() {
    this.startImageCycle();
  }

  startImageCycle() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.imagePaths.length;
      this.currentImagePath = this.imagePaths[this.currentIndex];
    }, 2000);
  }


  categories: CategoryModel[] = [
    {
      category: 'Signage',
      product: [
        'Printed Mug',
        'Printed T-shirt',
        'Banners',
        'Reception Cards',
        'Brochures',
      ]
    },
    {
      category: 'Signage',
      product: [
        'Printed Mug',
        'Printed T-shirt',
        'Banners',
        'Reception Cards',
        'Brochures',
      ]
    },
    {
      category: 'Signage',
      product: [
        'Printed Mug',
        'Printed T-shirt',
        'Banners',
        'Reception Cards',
        'Brochures',
      ]
    },
    {
      category: 'Signage',
      product: [
        'Printed Mug',
        'Printed T-shirt',
        'Banners',
        'Reception Cards',
        'Brochures',
      ]
    }


  ]

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
