import {AfterContentInit, Component, Inject} from '@angular/core';
import {ProductCardComponent} from "../../widgets/product-card/product-card.component";
import {ProductModel} from "../../models/product.model";
import {DOCUMENT, NgClass, NgOptimizedImage} from "@angular/common";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {CommentModel} from "../../models/comment.model";
import {ShopService} from "../shop/shop.service";

@Component({
  selector: 'app-product-detailed',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgOptimizedImage,
    NgxDropzoneModule,
    FormsModule,
    NgClass
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

  showOverlay: boolean = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.showOverlay = false;
    }
  }

  constructor(private service: ShopService, @Inject(DOCUMENT) private document: Document) {
    this.loadSelectedItemFromLocalStorage();
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
    this.service.addComment(comment).subscribe(() => {
        window.location.reload()
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

  scale(flag: boolean) {
    if (flag) {
      this.amount += 1
    } else {
      if (this.amount > 1) {
        this.amount -= 1
      }
    }
  }


  addToCartFromToolBar() {
    const data = (this.document.defaultView?.localStorage.getItem('auth_token'));
    let user = ''
    if (data) {
      user = JSON.parse(data).id
    }
    if (this.selectedItem?._id)
      this.service.addToCart(this.selectedItem?._id, 'inc', user, this.amount).subscribe(() => {
      })

    window.location.assign('shop')
  }

}
