import {AfterViewInit, Component, Inject, Input, output, signal} from '@angular/core';
import {DOCUMENT, NgClass, NgOptimizedImage} from "@angular/common";
import {ImageCardComponent} from "../image-card/image-card.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CategoryModel} from "../../models/category.model";
import {RouterLink} from "@angular/router";
import {toSignal} from "../../utils/signals/signal.util";
import {CartModel} from "../../models/cart.model";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImageCardComponent,
    ProductCardComponent,
    NgClass,
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements AfterViewInit {
  @Input({transform: toSignal})
  userName = signal('')
  logout = output<void>();

  cart!: CartModel[]

  routing(url: string) {
    window.location.replace(url)
  }

  ngAfterViewInit() {
    this.loadCartItems()
  }

  logOut() {
    this.logout.emit()
    window.location.replace('login')
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  saveCategoryToLocalStorage(item: string) {
    const category = JSON.stringify(item);
    this.document.defaultView?.localStorage.setItem('category', category);
    window.location.replace('shop')
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


  loadCartItems() {
    const selectedItemString = this.document.defaultView?.localStorage.getItem('cart');
    if (selectedItemString) {
      this.cart = JSON.parse(selectedItemString);
    }
    this.total()
  }


  showCart = false;
  cartItemsTotalPrice = 0

  total() {
    this.cartItemsTotalPrice = 0
    for (let i = 0; i <= this.cart.length; i++) {
      this.cartItemsTotalPrice += parseInt(this.cart[i].product.price) * this.cart[i].amount
    }

  }


  categories: CategoryModel[] = [
    {
      category: 'Impression Grandformat',
      product: [
        'Vinyle',
        'Bache',
        'Affiche',
        'Callendrier',
        'X-Banners',
      ]
    },
    {
      category: 'Conception Graphique',
      product: [
        'Création de logo',
        'Carte visite',
        'Papier-entête',
        'Identité graphique',
        'Conception catalogue',
      ]
    },
    {
      category: 'Marketing Digital',
      product: [
        'Community management',
        'Sponsoring',
        'Création sites E-commerce',
        'Vitrine',
      ]
    },
  ]


}
