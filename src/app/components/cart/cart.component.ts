import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import {CartModel} from "../../models/cart.model";
import {ShopService} from "../shop/shop.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements AfterContentInit {
  cart!: CartModel[]
  cartItemsTotalPrice = 0


  constructor(@Inject(DOCUMENT) private document: Document,private service: ShopService) {
  }


  ngAfterContentInit() {
    this.loadCartItems()

  }
  routing(url: string) {
    window.location.replace(url)
  }


  stringToInt(string: string){
    return parseInt(string)
  }


  loadCartItems() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.service.getCartItems(user).subscribe(data => {
      this.cart = data
      this.calculateTotalPrice()
    })
    this.cartItemsTotalPrice = 0
  }

  addToCartFromCart(productId: string | undefined, flag: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.addToCart(productId, flag, user).subscribe(() => {
        this.loadCartItems()

      })
  }

  calculateTotalPrice() {
    this.cartItemsTotalPrice = this.cart.reduce((total, cartItem) => {
      return total + (parseInt(cartItem.product.price) * cartItem.amount);
    }, 0);
  }}
