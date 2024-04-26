import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ImageCardComponent} from "../image-card/image-card.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CategoryModel} from "../models/category.model";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageCardComponent,
    ProductCardComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  categories: CategoryModel[] = [{
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
}
