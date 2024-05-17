import {AfterContentInit, Component} from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {ItemsComponent} from "../home/items/items.component";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "./shop.service";

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
export class ShopComponent implements AfterContentInit {
  product!: ProductModel[]
  filter='ahmed mo7sen'

  ngAfterContentInit() {
    this.loadProduct()

  }

  constructor(private service: ShopService) {
  }

  loadProduct() {
    this.service.loadProduct().subscribe(res => {
      this.product = res
    })
  }

  display = 'flex'


}
