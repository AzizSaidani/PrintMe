import {Component, Input, Signal} from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {toSignal} from "../../utils/signals/signal.util";
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
export class SettingsComponent {
  @Input({transform: toSignal})
  wishes!: Signal<ProductModel[]>

  currentSetting = 'Commandes'

  changeSettingNav(nav: string) {
    this.currentSetting = nav
  }

}
