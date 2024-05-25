import {AfterContentInit, Component, Inject} from '@angular/core';
import {DOCUMENT, NgOptimizedImage, NgStyle} from "@angular/common";
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {ShopService} from "../../services/shop-service/shop.service";
import {SettingService} from "../../services/settings-service/setting.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {ProfileModel} from "../../models/profile.model";
import {FormsModule} from "@angular/forms";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ProductCardComponent,
    NgStyle,
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements AfterContentInit {
  wishes!: ProductModel[]
  subscribed = false
  userData!: ProfileModel
  address!: string
  phone!: string
  email!: string
  username!: string
  newpass!: string
  oldpass!: string
  currentSetting = 'Account'


  ngAfterContentInit() {
    this.loadWishes()
    this.getStatus()
    this.getUserDetails()


  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }


  constructor(@Inject(DOCUMENT) private document: Document,
              private snackBar: MatSnackBar,
              private service: ShopService,
              private settingService: SettingService,
              private authService: AuthService
  ) {
  }

  setInitialValues() {
    if (this.userData.phone) {
      this.phone = this.userData.phone
    }

    if (this.userData.address) {
      this.address = this.userData.address
    }

    if (this.userData.username) {
      this.username = this.userData.username
      this.setInitialValues()
    }

  }

  getUserDetails() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let id = ''
    if (data) {
      id = JSON.parse(data).id
      this.email=JSON.parse(data).email
    }
    this.authService.getUserDetails(id).subscribe(res => {
      console.log(res);
      this.userData = res
      this.setInitialValues()
    })
  }

  loadWishes() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    this.service.getFavouriteItems(user).subscribe(data => {
      this.wishes = []
      data.forEach((item: { product: ProductModel; }) => {
        this.wishes.push(item.product);
      });
    })
  }

  toggleFavouriteInProfile(productId: string | undefined) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (productId)
      this.service.toggleFavourite(productId, user).subscribe(() => {
        this.openSnackBar('Changement a été fait avec succès', 'fermer')
      })
  }



  changeSettingNav(nav: string) {
    this.currentSetting = nav
  }

  subscribe() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    let tag = ''
    if (data) {
      user = JSON.parse(data).email
    }
    if (!this.subscribed) {
      tag = 'del'
    } else {
      tag = 'add'
    }
    this.settingService.subscribe(user, tag).subscribe(res => {
      this.openSnackBar('Changement a été fait avec succès', 'fermer')
    })
  }

  getStatus() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.settingService.getStatus(user).subscribe(res => {
      this.subscribed = res.isSubscribed
    })
  }


  changePassword(oldpass: string, newpass: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.changePassword(oldpass, newpass, user).subscribe(() => {
      window.location.reload()
    })
  }

  updatePhoneNumber(number: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.updatePhoneNumber(number, user).subscribe(() => {
      window.location.reload()
    })
  }

  updateUserName(name: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.updateUsername(name, user).subscribe(() => {
      window.location.reload()
    })
  }

  updateAdresse(adresse: string) {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).email
    }
    this.authService.updateAddress(adresse, user).subscribe(() => {
      window.location.reload()
    })
  }


  update() {
    if (this.username) {
      this.updateUserName(this.username)
    }
    if (this.address) {
      this.updateAdresse(this.address)
    }
    if (this.phone) {
      this.updatePhoneNumber(this.phone)
    }

    if (this.newpass && this.oldpass) {
      this.changePassword(this.oldpass, this.newpass)
    }

    this.openSnackBar('Mise à jour du profil réussie', 'fermer')


  }


}
