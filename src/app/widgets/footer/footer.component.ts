import { Component } from '@angular/core';
import { SubFromFooterService } from './sub-from-footer.service';
import { FormsModule, NgForm } from '@angular/forms';
import {NgOptimizedImage} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email = '';
  validator=''

  constructor(private service: SubFromFooterService, private snackBar: MatSnackBar) {}

  subscribe() {
      this.service.subscribe(this.email)
        .subscribe({
          next: () => {
            this.email = ''; // Clear email field on successful subscription

            // Display success snackbar using Material Design
            this.snackBar.open('You have been subscribed to the newsletter!', '', {
              duration: 3000, // Display for 3 seconds
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          },
          error: (error) => {
            // Handle errors gracefully, e.g., display an error message
            this.snackBar.open('Subscription failed: ' + error.message, '', {
              duration: 5000, // Display for 5 seconds for user awareness
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        });

  }
}
