import {Component, Inject, Input, output, signal} from '@angular/core';
import {DOCUMENT, NgClass, NgOptimizedImage} from "@angular/common";
import {ImageCardComponent} from "../image-card/image-card.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CategoryModel} from "../../models/category.model";
import {ProductModel} from "../../models/product.model";
import {RouterLink} from "@angular/router";
import {toSignal} from "../../utils/signals/signal.util";

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
export class ToolbarComponent {
  @Input({transform: toSignal})
  userName = signal('')
  logout = output<void>();

  routing(url: string) {
    window.location.replace(url)
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

  @Input()
  cartItems!: ProductModel[]
  showCart = false;
  cartItemsTotalPrice = 0

  total() {
    this.cartItemsTotalPrice = 0
    for (let i = 0; i <= this.cartItems.length; i++) {
      this.cartItemsTotalPrice += parseInt(this.cartItems[i].price)
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
