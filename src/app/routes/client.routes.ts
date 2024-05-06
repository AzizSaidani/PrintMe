import {Routes} from '@angular/router';
import {HomeComponent} from "../components/home/home.component";
import {FaqComponent} from "../components/faq/faq.component";
import {ShopComponent} from "../components/shop/shop.component";
import {OurServiceComponent} from "../components/our-service/our-service.component";
import {ContactComponent} from "../components/contact/contact.component";
import {CartComponent} from "../components/cart/cart.component";
import {SettingsComponent} from "../components/settings/settings.component";
import {LoginComponent} from "../components/auth_component/login/login.component";
import {SignupComponent} from "../components/auth_component/signup/signup.component";
import {ForgetPasswordComponent} from "../components/auth_component/forget-password/forget-password.component";
// Import other client components for routing

export const clientRoutes: Routes = [
  {path: 'visitor', component: HomeComponent},
  {path: 'visitor/Faq', component: FaqComponent},
  {path: 'visitor/Shop', component: ShopComponent},
  {path: 'visitor/Our_Services', component: OurServiceComponent},
  {path: 'visitor/Contact', component: ContactComponent},
  {path: 'visitor/Cart', component: CartComponent},
  {path: 'visitor/Settings', component: SettingsComponent},
  {path: 'visitor/Login', component: LoginComponent},
  {path: 'visitor/Signup', component: SignupComponent},
  {path: 'visitor/ForgetPassword', component: ForgetPasswordComponent},
];


