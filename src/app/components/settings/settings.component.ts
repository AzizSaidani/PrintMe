import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage, NgStyle} from "@angular/common";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProductCardComponent,
    NgStyle
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements AfterContentInit {
  wishes!: ProductModel[]

  ngAfterContentInit() {
    this.loadWishes()
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
  }


  loadWishes() {
    const selectedItemString = this.document.defaultView?.localStorage.getItem('wishes');
    if (selectedItemString) {
      let data = JSON.parse(selectedItemString)
      this.wishes = JSON.parse(selectedItemString);
      console.log(data)
      console.log(this.wishes)
    }
  }

  currentSetting = 'Wishes'

  changeSettingNav(nav: string) {
    this.currentSetting = nav
  }

  addtoWishesInLocalStorage(product: ProductModel) {
    let cart: ProductModel[] = [];
    const cartString = this.document.defaultView?.localStorage.getItem('wishes');
    if (cartString) {
      cart = JSON.parse(cartString);
    }

    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === product._id);
    if (existingItemIndex !== -1) {

    } else {
      cart.push(product);
    }

    // Store the updated cart in localStorage
    const updatedCartString = JSON.stringify(cart);
    this.document.defaultView?.localStorage.setItem('wishes', updatedCartString);
  }


}
