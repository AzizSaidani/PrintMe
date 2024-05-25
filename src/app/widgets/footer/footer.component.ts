import {Component} from '@angular/core';
import {SubFromFooterService} from '../../services/footer-service/sub-from-footer.service';
import {FormsModule} from '@angular/forms';
import {NgOptimizedImage} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email = '';
  validator = ''

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }

  constructor(private service: SubFromFooterService, private snackBar: MatSnackBar) {
  }

  subscribe() {
    this.service.subscribe(this.email)
      .subscribe({
        next: () => {
          this.email = '';
          this.openSnackBar('le changement a été fait avec succès', 'fermer')
        }
      });

  }
}
