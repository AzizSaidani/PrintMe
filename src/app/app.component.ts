import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from "./widgets/card/card.component";
import {ImageCardComponent} from "./widgets/image-card/image-card.component";
import {ProductCardComponent} from "./widgets/product-card/product-card.component";
import {ProductModel} from "./models/product.model";
import {ToolbarComponent} from "./widgets/toolbar/toolbar.component";
import {BestSellingsComponent} from "./widgets/best-sellings/best-sellings.component";
import {FooterComponent} from "./widgets/footer/footer.component";
import {ServiceSectionComponent} from "./widgets/service-section/service-section.component";
import {AboutUsSectionComponent} from "./widgets/about-us-section/about-us-section.component";
import {WhyUsComponent} from "./widgets/why-us/why-us.component";
import {SliderComponent} from "./widgets/slider/slider.component";
import {RecentWorksComponent} from "./widgets/recent-works/recent-works.component";
import {ContactComponent} from "./components/contact/contact.component";
import {AboutUsComponent} from "./widgets/about-us/about-us.component";
import {HoveredPicutreModel} from "./models/hovered-picutre.model";
import {FaqComponent} from "./components/faq/faq.component";
import {FAQModel} from "./models/FAQ.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, ImageCardComponent, ProductCardComponent, ToolbarComponent, BestSellingsComponent, FooterComponent, ServiceSectionComponent, AboutUsSectionComponent, WhyUsComponent, SliderComponent, RecentWorksComponent, ContactComponent, AboutUsComponent, FaqComponent],
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


  aboutUsProducts: HoveredPicutreModel[] = [

    {
      text: 'PILLOW PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/hvnfuppizowvtnyhoiwo.jpg'
    },
    {
      text: 'T-SHIRT PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/s87kkvhm9ouryrpaljnj.jpg'
    },
    {
      text: 'DIGITAL PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/hwimotbgvw9u3rvcpfgx.jpg'
    },
    {
      text: 'SURFACE PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/z0cmbg6nmlyezlv5cyfp.jpg'
    },
    {
      text: 'SCREEN PRINTING',
      imagePath: 'https://res.cloudinary.com/dwkp2dnfs/image/upload/t1wbw7ihb8b96c14dlab.jpg'
    },
    {
      text: 'FLEXOGRAPHIC PRINTING',
      imagePath: 'https://printme-theme.myshopify.com/cdn/shop/files/abo01.jpg?v=1641808073'
    },


  ]

  faqs:FAQModel[]=[
    {
      question:'HOW WILL MY ORDER BE DELIVERED TO ME?',
      response:'Eget dolor morbi non arcu risus quis varius quam. Arcu non sodales neque sodales ut etiam sit. Ultrices dui\n' +
        '        sapien eget mi. Consectetur adipiscing elit ut aliquam purus sit. Fermentum leo vel orci porta non pulvinar.\n' +
        '        Morbi tristique senectus et netus et malesuada fames ac. Venenatis lectus magna fringilla urna porttitor\n' +
        '        rhoncus. In cursus turpis massa tincidunt dui. Eget nunc scelerisque viverra mauris in aliquam sem.\n' +
        ' ',
      open:false
    },
    {
      question:'HOW WILL MY ORDER BE DELIVERED TO ME?',
      response:'Eget dolor morbi non arcu risus quis varius quam. Arcu non sodales neque sodales ut etiam sit. Ultrices dui\n' +
        '        sapien eget mi. Consectetur adipiscing elit ut aliquam purus sit. Fermentum leo vel orci porta non pulvinar.\n' +
        '        Morbi tristique senectus et netus et malesuada fames ac. Venenatis lectus magna fringilla urna porttitor\n' +
        '        rhoncus. In cursus turpis massa tincidunt dui. Eget nunc scelerisque viverra mauris in aliquam sem.\n' +
        ' ',
      open:false
    },
    {
      question:'HOW WILL MY ORDER BE DELIVERED TO ME?',
      response:'Eget dolor morbi non arcu risus quis varius quam. Arcu non sodales neque sodales ut etiam sit. Ultrices dui\n' +
        '        sapien eget mi. Consectetur adipiscing elit ut aliquam purus sit. Fermentum leo vel orci porta non pulvinar.\n' +
        '        Morbi tristique senectus et netus et malesuada fames ac. Venenatis lectus magna fringilla urna porttitor\n' +
        '        rhoncus. In cursus turpis massa tincidunt dui. Eget nunc scelerisque viverra mauris in aliquam sem.\n' +
        ' ',
      open:false
    },
    {
      question:'HOW WILL MY ORDER BE DELIVERED TO ME?',
      response:'Eget dolor morbi non arcu risus quis varius quam. Arcu non sodales neque sodales ut etiam sit. Ultrices dui\n' +
        '        sapien eget mi. Consectetur adipiscing elit ut aliquam purus sit. Fermentum leo vel orci porta non pulvinar.\n' +
        '        Morbi tristique senectus et netus et malesuada fames ac. Venenatis lectus magna fringilla urna porttitor\n' +
        '        rhoncus. In cursus turpis massa tincidunt dui. Eget nunc scelerisque viverra mauris in aliquam sem.\n' +
        ' ',
      open:false
    },
    {
      question: 'HOW WILL MY ORDER BE DELIVERED TO ME?',
      response: 'Eget dolor morbi non arcu risus quis varius quam. Arcu non sodales neque sodales ut etiam sit. Ultrices dui\n' +
        '        sapien eget mi. Consectetur adipiscing elit ut aliquam purus sit. Fermentum leo vel orci porta non pulvinar.\n' +
        '        Morbi tristique senectus et netus et malesuada fames ac. Venenatis lectus magna fringilla urna porttitor\n' +
        '        rhoncus. In cursus turpis massa tincidunt dui. Eget nunc scelerisque viverra mauris in aliquam sem.\n' +
        ' ',
      open: false
    },
  ]

}
