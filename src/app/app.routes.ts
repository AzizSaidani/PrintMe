import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ContactComponent} from "./components/contact/contact.component";
import {LoginComponent} from "./components/auth_component/login/login.component";
import {FaqComponent} from "./components/faq/faq.component";
import {ShopComponent} from "./components/shop/shop.component";
import {OurServiceComponent} from "./components/our-service/our-service.component";
import {CartComponent} from "./components/cart/cart.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {SignupComponent} from "./components/auth_component/signup/signup.component";
import {ForgetPasswordComponent} from "./components/auth_component/forget-password/forget-password.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {authGuard, authGuardConnected} from "./auth/auth.guard";
import {LoginAdminComponent} from "./back-office/login/login-admin/login-admin.component";
import {ProductDetailedComponent} from "./components/product-detailed/product-detailed.component";

export const routes: Routes = [
  //** Commune **//
  {path: '', component: HomeComponent},
  {path: 'faq', component: FaqComponent, canActivate: [authGuard]},
  {path: 'shop', component: ShopComponent,},
  {path: 'details', component: ProductDetailedComponent,},
  {path: 'ourServices', component: OurServiceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent, canActivate: [authGuardConnected]},
  {path: 'signup', component: SignupComponent, canActivate: [authGuardConnected]},
  {path: 'forgetPassword', component: ForgetPasswordComponent, canActivate: [authGuardConnected]},
  {path: 'about', component: AboutUsComponent},

  //** Admin **//
  {path: 'admin', component: HomeComponent},
  {path: 'admin/login', component: LoginAdminComponent},


  //** Client **//
  {path: 'client/profile', component: SettingsComponent},


  //** Redirect **//
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
