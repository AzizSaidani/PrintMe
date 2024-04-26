import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ImageCardComponent} from "../image-card/image-card.component";
import {ProductModel} from "../models/product.model";
import {ProductCardComponent} from "../product-card/product-card.component";

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

  product:ProductModel={
    price:'500',
    filePath:'assets/images/cup.png',
    rating:3,
    name:'Mug'
  }
}
