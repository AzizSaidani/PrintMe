import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage, NgStyle} from "@angular/common";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "../shop/shop.service";

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

  constructor(@Inject(DOCUMENT) private document: Document, private service: ShopService) {
  }


  loadWishes() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.service.getFavouriteItems(user).subscribe(data => {
      this.wishes = []
      data.forEach((item: { product: ProductModel; }) => {
        this.wishes.push(item.product);
      });

      console.log(this.wishes)
    })
  }

  toggleFavouriteInProfile(productId: string | undefined) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.toggleFavourite(productId, user).subscribe(() => {
        window.location.reload()
      })
  }


  currentSetting = 'Wishes'

  changeSettingNav(nav: string) {
    this.currentSetting = nav
  }


}
