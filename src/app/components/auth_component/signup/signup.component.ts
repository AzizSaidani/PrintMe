import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth-service/auth.service";
import {FormsModule} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  register() {
    const userData = {
      username: this.firstName + this.lastName,
      email: this.email,
      password: this.password,
      role: 'client',
      status: 'active'
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);

        // Navigate to the login page
        const navigationExtras: NavigationExtras = {
          queryParams: {registered: 'true'}
        };
        this.router.navigate(['/login'], navigationExtras);

      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }

}
