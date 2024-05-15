import {Component} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormsModule} from "@angular/forms";
import {UserModel} from "../../../models/user.model";

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

  constructor(private authService: AuthService) {
  }


  register() {
    const userData = {
      username: this.firstName + this.lastName,
      email: this.email,
      password: this.password,
      role: 'client',
      status:'active'
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }

}
