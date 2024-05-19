import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import {CartModel} from "../../models/cart.model";

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


  constructor(@Inject(DOCUMENT) private document: Document) {
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
    const selectedItemString = this.document.defaultView?.localStorage.getItem('cart');
    if (selectedItemString) {
      this.cart = JSON.parse(selectedItemString);
    }
  }
}
