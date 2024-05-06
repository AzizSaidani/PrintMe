import {Routes} from '@angular/router';
import {HomeComponent} from "../components/home/home.component";
import {LoginComponent} from "../components/auth_component/login/login.component";
// Import other admin components for routing

export const adminRoutes: Routes = [
  {'path': 'admin', component: HomeComponent},
  {'path': 'admin/login', component: LoginComponent},
];

