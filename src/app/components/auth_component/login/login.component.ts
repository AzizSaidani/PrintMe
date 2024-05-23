import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
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

  constructor(private authService: AuthService) {
  }

  routing(url: string) {
    window.location.replace(url)
  }


  login() {
    const credentials = {
      email: this.email,
      password: this.password
    }

    this.authService.login(credentials, 'client').subscribe(
      (response) => {
        console.log('Login successful:', response);
        window.location.replace('')
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

}
