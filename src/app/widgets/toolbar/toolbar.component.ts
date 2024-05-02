import {Component, OnDestroy} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {ImageCardComponent} from "../image-card/image-card.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageCardComponent,
    ProductCardComponent,
    NgClass
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnDestroy{

  showCart = false;

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
