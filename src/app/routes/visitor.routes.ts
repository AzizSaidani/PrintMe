import { Routes, RouterModule } from '@angular/router';
import {FaqComponent} from "../components/faq/faq.component";
import {ShopComponent} from "../components/shop/shop.component";
import {HomeComponent} from "../components/home/home.component";
import {OurServiceComponent} from "../components/our-service/our-service.component";
import {ContactComponent} from "../components/contact/contact.component";
import {CartComponent} from "../components/cart/cart.component";

const visitorRoutes: Routes = [
  { path: 'visitor', component: HomeComponent },
  { path: 'visitor/Faq', component: FaqComponent },
  { path: 'visitor/Shop', component: ShopComponent },
  { path: 'visitor/Our_Services', component: OurServiceComponent },
  { path: 'visitor/Contact', component: ContactComponent },
  { path: 'visitor/Cart', component: CartComponent },
];

export const VisitorRoutingModule = RouterModule.forChild(visitorRoutes);
