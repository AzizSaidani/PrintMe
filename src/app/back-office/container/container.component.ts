import {AfterViewInit, Component} from '@angular/core';
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Contact} from "../../models/reclamation.model";
import {UserModel} from "../../models/user.model";
import {AddProductService} from "../service/add-product.service";
import {ShopService} from "../../services/shop-service/shop.service";
import {ProductModel} from "../../models/product.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackbarComponent} from "../../custom-snackbar/custom-snackbar.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements AfterViewInit {
  files: File[] = []
  product!: ProductModel[]
  reclamation: Contact[] = []
  contact: Contact[] = []
  userlist: UserModel[] = []

  category = 'Imperssion numerique';
  newProductPrice = ''
  newProductName = ''
  newProductDescription = ''
  fileName = 'Choisir une image'
  reclamationStatus = 'non lu'
  contactStatus = 'non lu'

  selectedElement = 'newsLetter'
  selectedProduct!: ProductModel
  selectedReclamation!: Contact
  selectedContact!: Contact
  selectedUser!: UserModel
  subs!: { id: string, email: string }[]


  emailSubject!: string
  emailBody!: string


  add = ''
  showOverlay: boolean = false;


  constructor(private snackBar: MatSnackBar,
              private service: AddProductService, private productService: ShopService,) {

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {message: message, action: action},
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }

  ngAfterViewInit() {
    this.loadReclamation()
    this.loadProduct()
    this.loadContact()
    this.loadUsers()
    this.loadSub()
  }


  loadProduct() {
    this.productService.loadProduct().subscribe(res => {
      this.product = res
    })
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.showOverlay = false;
    }
  }

  updateProduct() {
    const updatedProductData = {
      price: this.selectedProduct.price,
      name: this.selectedProduct.name,
      category: this.selectedProduct.category,
      description: this.selectedProduct.description,
      imagePath: this.selectedProduct.imagePath,
      offer: this.selectedProduct.offer// Assuming you want to update imagePath with fileName
    };
    if (this.selectedProduct._id)
      this.service.updateProduct(this.selectedProduct._id, updatedProductData).subscribe(
        (res) => {
          // Handle success response if needed
          console.log('Product updated successfully:', res);
          this.loadProduct()
          this.openSnackBar('le produit a été modifier', 'fermer')
          this.add = ''

        },
        (error) => {
          // Handle error response if needed
          console.error('Error updating product:', error);
        }
      )
  }

  deleteProduct(product: ProductModel) {
    if (product._id)
      this.service.deleteProduct(product._id).subscribe((res) => {
        console.log('Product deleted successfully:', res);
        this.toggleOverlay()
        this.loadProduct()
      })


  }


  loadReclamation() {
    this.service.loadReclamation().subscribe(res => {
      this.reclamation = res
    })
  }

  loadContact() {
    this.service.loadContact().subscribe(res => {
      this.contact = res
    })
  }

  loadUsers() {
    this.service.loadUsers().subscribe(res => {
      this.userlist = res
    })
  }

  loadSub(): void {
    this.service.loadSubscribers().subscribe(
      res => {
        this.subs = res
      },
    );
  }


  onSelect(event: any) {
    this.files = [];
    const firstFile = event.addedFiles[0];
    if (firstFile) {
      this.files.push(firstFile);
    }
    this.fileName = this.files[0].name
  }

  async addProduct() {

    let imagePath: string


    if (!this.newProductDescription || !this.newProductName || !this.newProductPrice || !this.files[0]) {
      if (!this.files[0]) {
        alert('Choisir une image ')
      }
      alert('données manquantes')
    }
    const file_data = this.files[this.files.length - 1]
    const data = new FormData()
    data.append('file', file_data)
    data.append('upload_preset', 'pfe_product')
    data.append('cloud_name', 'dwkp2dnfs')
    this.service.uploadImage(data).subscribe((res) => {
      imagePath = res.url

      const product = {
        name: this.newProductName,
        price: this.newProductPrice,
        imagePath: imagePath,
        description: this.newProductDescription,
        category: this.category
      }
      this.service.addProduct(product).subscribe(res => {
          this.openSnackBar('le produit a été ajouter', 'fermer')

          this.loadProduct()
          this.add = ''

        },
        (error) => {
          console.error('Login failed:', error);
        })

    })


  }


  updateReclamation() {
    const data = {
      id: this.selectedReclamation._id,
      newStatus: this.selectedReclamation.status
    }
    this.service.updateRecalamtionStatus(data).subscribe(() => {
    })
  }

  updateContact() {
    const data = {
      id: this.selectedContact._id,
      newStatus: this.selectedContact.status
    }
    this.service.updateContactStatus(data).subscribe(() => {
    })
  }

  updateUserStatus() {
    const data = {
      id: this.selectedUser._id,
      status: this.selectedUser.status,
      role: this.selectedUser.role
    }
    this.service.updateUserStatus(data).subscribe(() => console.log(this.selectedUser._id))
  }


  sendEmailToMultipleRecipients() {
    const emailAddresses = this.subs.map(sub => sub.email).join(',');
    const emailData = {

      recipients: emailAddresses,
      subject: this.emailSubject,
      body: this.emailBody
    };
    if (emailAddresses && this.emailBody && this.emailSubject) {
      this.service.sendEmail(emailData).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
    }


  }

}
