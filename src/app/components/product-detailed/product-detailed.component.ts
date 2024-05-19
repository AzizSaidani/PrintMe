import {AfterContentInit, Component, Inject} from '@angular/core';
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {CommentModel} from "../../models/comment.model";
import {ShopService} from "../shop/shop.service";
import {CartModel} from "../../models/cart.model";

@Component({
  selector: 'app-product-detailed',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgOptimizedImage,
    NgxDropzoneModule,
    FormsModule
  ],
  templateUrl: './product-detailed.component.html',
  styleUrl: './product-detailed.component.scss'
})
export class ProductDetailedComponent implements AfterContentInit {
  selectedItem: ProductModel | null = null;
  fileName = 'Choisir une image'
  amount = 1
  isCustomized = false;
  files: File[] = []
  userData = JSON.parse(localStorage.getItem('auth_token') || '{}');
  username = this.userData.username
  comment = ''
  comments: CommentModel[] = []

  constructor(private service: ShopService, @Inject(DOCUMENT) private document: Document) {
    this.loadSelectedItemFromLocalStorage();
  }

  addtoCartInLocalStorage(product: ProductModel, amount?: number) {
    let cart: CartModel[] = [];
    const cartString = this.document.defaultView?.localStorage.getItem('cart');
    if (cartString) {
      cart = JSON.parse(cartString);
    }

    const existingItemIndex = cart.findIndex(cartItem => cartItem.product._id === product._id);
    if (existingItemIndex !== -1) {
      if (amount === 1) {
        cart[existingItemIndex].amount += amount;
        this.amount += amount
      } else if (amount === -1 && cart[existingItemIndex].amount > 1) {
        cart[existingItemIndex].amount += amount;
        if (this.amount > 1) {
          this.amount += amount

        }

      }
    } else {
      const newCartItem: CartModel = {
        product: product,
        amount: 1
      };
      cart.push(newCartItem);
    }

    // Store the updated cart in localStorage
    const updatedCartString = JSON.stringify(cart);
    this.document.defaultView?.localStorage.setItem('cart', updatedCartString);
  }

  loadSelectedItemFromLocalStorage() {
    const selectedItemString = this.document.defaultView?.localStorage.getItem('selectedItem');
    if (selectedItemString) {
      this.selectedItem = JSON.parse(selectedItemString);
    }
  }

  ngAfterContentInit() {
    this.loadComments()
  }

  loadComments() {
    this.service.loadComments().subscribe(
      data => {
        this.comments = data.filter(comment => comment.productId === this.selectedItem?._id);

      },
      error => {
        console.error('Error loading comments', error);
      }
    );
  }


  addComment() {
    const comment: CommentModel = {
      name: this.username,
      productId: this.selectedItem?._id,
      description: this.comment,
    }
    this.service.addComment(comment).subscribe((response) => {
        console.log('Login successful:', response);
        window.location.replace('shop')
      },
      (error) => {
        console.error('Login failed:', error);
      }
    )
  }

  onSelect(event: any) {
    this.files = [];
    const firstFile = event.addedFiles[0];
    if (firstFile) {
      this.files.push(firstFile);
    }
    this.fileName = this.files[0].name
  }

}
