import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavigationExtras, Router, RouterLink} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = ''
  password = ''

  constructor(private authService: AuthService, private router: Router) {
  }


  login() {
    const credentials = {
      email: this.email,
      password: this.password
    }

    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        const navigationExtras: NavigationExtras = {
          queryParams: {registered: 'true'}
        };
        // this.router.navigate([''], navigationExtras)
        window.location.replace('')
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

}
