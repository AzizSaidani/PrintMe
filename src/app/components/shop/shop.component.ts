import {AfterContentInit, Component} from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {ItemsComponent} from "../home/items/items.component";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "./shop.service";
import {ProductDetailedComponent} from "../product-detailed/product-detailed.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ItemsComponent,
    ProductCardComponent,
    NgStyle,
    ProductDetailedComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements AfterContentInit {
  product!: ProductModel[]
  selectedItem: ProductModel | undefined
  filter = 'ahmed mo7sen'

  ngAfterContentInit() {
    this.loadProduct()

  }

  constructor(private service: ShopService) {
  }

  loadProduct() {
    this.service.loadProduct().subscribe(res => {
      this.product = res
      this.selectedItem = res[0]
    })
  }


}
