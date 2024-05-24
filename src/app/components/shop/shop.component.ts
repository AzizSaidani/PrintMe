import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage, NgStyle} from "@angular/common";
import {ItemsComponent} from "../home/items/items.component";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "../../services/shop-service/shop.service";
import {ProductDetailedComponent} from "../product-detailed/product-detailed.component";
import {CartModel} from "../../models/cart.model";

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
  category = 'shops'
  filter = 'ahmed mo7sen'


  comparing(path: string, category: string) {
    return path.toLowerCase() === category.toLowerCase();
  }


  ngAfterContentInit() {
    this.loadProduct()
  }

  constructor(private service: ShopService, @Inject(DOCUMENT) private document: Document) {
    this.loadCategoryFromLocalStorage()
  }

  saveSelectedItemToLocalStorage(item: ProductModel) {
    const selectedItem = JSON.stringify(item);
    this.document.defaultView?.localStorage.setItem('selectedItem', selectedItem);
    window.location.assign('details')
  }

  loadCategoryFromLocalStorage() {
    const category = this.document.defaultView?.localStorage.getItem('category');
    if (category) {
      this.category = JSON.parse(category);
    }
  }


  loadProduct() {
    this.service.loadProduct().subscribe(res => {
      this.product = res
    })
  }

  addToCart(productId: string | undefined, flag: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.addToCart(productId, flag, user).subscribe(() => {
        alert('item has been addedo')
      })
  }

  toggleFavourite(productId: string | undefined) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.toggleFavourite(productId, user).subscribe(() => {
        alert('item has been added')
      })
  }


}
