import {Component} from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {SliderComponent} from "./slider/slider.component";
import {AboutUsSectionComponent} from "./about-us-section/about-us-section.component";
import {ServiceSectionComponent} from "./service-section/service-section.component";
import {WhyUsComponent} from "./why-us/why-us.component";
import {RecentWorksComponent} from "./recent-works/recent-works.component";
import {BestSellingsComponent} from "./best-sellings/best-sellings.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    AboutUsSectionComponent,
    ServiceSectionComponent,
    BestSellingsComponent,
    WhyUsComponent,
    RecentWorksComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  bestSellingItems: ProductModel[] =
    [

      {
        price: '500',
        imagePath: 'assets/images/cup.png',
        rating: 3,
        name: 'Mug'
      },
      {
        price: '500',
        imagePath: 'assets/images/cup.png',
        rating: 3,
        name: 'Mug'
      }
      , {
      price: '500',
      imagePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }, {
      price: '500',
      imagePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }, {
      price: '500',
      imagePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }, {
      price: '500',
      imagePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }
    ]


}
