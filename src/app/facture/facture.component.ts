import {AfterViewInit, Component, Inject} from '@angular/core';
import {CartModel} from "../models/cart.model";
import {FactureService} from "../services/facture-service/facture.service";
import {ShopService} from "../services/shop-service/shop.service";
import {DOCUMENT, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class FactureComponent implements AfterViewInit {
  cart!: CartModel[]
  cartItemsTotalPrice = 0

  ngAfterViewInit() {
    this.loadCartItems()
  }


  constructor(@Inject(DOCUMENT) private document: Document, private service: FactureService, private shopService: ShopService) {
  }

  generateFacture() {
    this.loadCartItems()
    this.service.generateBill(this.cart).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'facture.pdf';
      link.click();
      window.location.replace('')
    }, (error) => {
      console.error('Error generating bill:', error);
    });
  }

  deleteCart() {
    window.location.assign('shop')
  }


  loadCartItems() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.shopService.getCartItems(user).subscribe(data => {
      this.cart = data
      this.calculateTotalPrice()
    })
    this.cartItemsTotalPrice = 0
  }

  calculateTotalPrice() {
    this.cartItemsTotalPrice = this.cart.reduce((total, cartItem) => {
      return total + (parseInt(cartItem.product.price) * cartItem.amount);
    }, 0);
  }


}
