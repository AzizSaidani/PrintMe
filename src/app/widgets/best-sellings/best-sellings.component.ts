import {Component, Input, signal, Signal} from '@angular/core';
import {FilterModel} from "../models/filter.model";
import {NgClass} from "@angular/common";
import {ProductModel} from "../models/product.model";
import {toSignal} from "../../utils/signals/signal.util";
import {ItemsComponent} from "./items/items.component";

@Component({
  selector: 'app-best-sellings',
  standalone: true,
  imports: [
    NgClass,
    ItemsComponent
  ],
  templateUrl: './best-sellings.component.html',
  styleUrl: './best-sellings.component.scss'
})
export class BestSellingsComponent {
  @Input({transform: toSignal})
  items!: Signal<ProductModel[]>

  @Input({transform: toSignal})
  filter: Signal<FilterModel[]> = signal(
    [
      {
        name: 'All',
        selected: true
      },
      {
        name: 'BUSSINESS CARD'
      },
      {
        name: 'CALENDER'
      },
      {
        name: 'DECORATION'
      },
      {
        name: 'T-SHIRT'
      },


    ])



}
