import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage, NgStyle} from "@angular/common";
import {ItemsComponent} from "../home/items/items.component";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "./shop.service";
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
    window.location.replace('details')
  }

  loadCategoryFromLocalStorage() {
    const category = this.document.defaultView?.localStorage.getItem('category');
    if (category) {
      this.category = JSON.parse(category);
    }
  }


  addtoCartInLocalStorage(product: ProductModel, amount?: number) {
    let cart: CartModel[] = [];
    const cartString = this.document.defaultView?.localStorage.getItem('cart');
    if (cartString) {
      cart = JSON.parse(cartString);
    }

    const existingItemIndex = cart.findIndex(cartItem => cartItem.product._id === product._id);
    if (existingItemIndex !== -1) {
      if (amount === 1) {
        cart[existingItemIndex].amount += amount;
      } else if (amount === -1 && cart[existingItemIndex].amount > 1) {
        cart[existingItemIndex].amount += amount;


      }
    } else {
      const newCartItem: CartModel = {
        product: product,
        amount:1
      };
      cart.push(newCartItem);
    }

    // Store the updated cart in localStorage
    const updatedCartString = JSON.stringify(cart);
    this.document.defaultView?.localStorage.setItem('cart', updatedCartString);
  }


  loadProduct() {
    this.service.loadProduct().subscribe(res => {
      this.product = res
    })
  }


}
