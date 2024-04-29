import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from "./widgets/card/card.component";
import {ImageCardComponent} from "./widgets/image-card/image-card.component";
import {ProductCardComponent} from "./widgets/product-card/product-card.component";
import {ProductModel} from "./widgets/models/product.model";
import {ToolbarComponent} from "./widgets/toolbar/toolbar.component";
import {BestSellingsComponent} from "./widgets/best-sellings/best-sellings.component";
import {FooterComponent} from "./widgets/footer/footer.component";
import {ServiceSectionComponent} from "./widgets/service-section/service-section.component";
import {AboutUsSectionComponent} from "./widgets/about-us-section/about-us-section.component";
import {WhyUsComponent} from "./widgets/why-us/why-us.component";
import {SliderComponent} from "./widgets/slider/slider.component";
import {RecentWorksComponent} from "./widgets/recent-works/recent-works.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, ImageCardComponent, ProductCardComponent, ToolbarComponent, BestSellingsComponent, FooterComponent, ServiceSectionComponent, AboutUsSectionComponent, WhyUsComponent, SliderComponent, RecentWorksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  product: ProductModel = {
    price: '500',
    filePath: 'assets/images/cup.png',
    rating: 3,
    name: 'Mug'
  }

  bestSellingItems: ProductModel[] = [

    {
      price: '500',
      filePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    },
    {
      price: '500',
      filePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }
    , {
      price: '500',
      filePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }, {
      price: '500',
      filePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }, {
      price: '500',
      filePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }, {
      price: '500',
      filePath: 'assets/images/cup.png',
      rating: 3,
      name: 'Mug'
    }
  ]

}
