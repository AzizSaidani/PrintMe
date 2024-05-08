import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ContactService} from "./service/contact.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  name = '';
  email = '';
  phone = '';
  description = '';

  constructor(private service: ContactService) {
  }

  contact() {
    const contactData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      description: this.description,
    }

    this.service.contact(contactData).subscribe(
      () => {
        console.log('success')
      },
      error => {
        console.log(error)
      }
    )

  }
}
