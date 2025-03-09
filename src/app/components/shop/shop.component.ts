import { AfterContentInit, Component, Inject } from '@angular/core';
import { DOCUMENT, NgOptimizedImage, NgStyle } from "@angular/common";
import { ItemsComponent } from "../home/items/items.component";
import { ProductCardComponent } from "../../widgets/product-card/product-card.component";
import { ProductModel } from "../../models/product.model";
import { ShopService } from "../../services/shop-service/shop.service";
import { ProductDetailedComponent } from "../product-detailed/product-detailed.component";
import { CustomSnackbarComponent } from "../../widgets/custom-snackbar/custom-snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ItemsComponent,
    ProductCardComponent,
    NgStyle,
    ProductDetailedComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements AfterContentInit {
  product: ProductModel[] = [];
  filteredProducts: Observable<ProductModel[]>;
  private productsSubject = new BehaviorSubject<ProductModel[]>([]);
  selectedItem: ProductModel | undefined;
  category = 'shop';
  sortOption = 'featured';

  filters = {
    availability: '',
    priceMin: null as number | null,
    priceMax: null as number | null
  };

  constructor(
    private snackBar: MatSnackBar,
    private service: ShopService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.filteredProducts = this.productsSubject.asObservable();
    this.loadCategoryFromLocalStorage();
  }

  ngAfterContentInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.service.loadProduct().subscribe(res => {
      this.product = res;
      this.applyFilters(); // Initial filter application
    });
  }

  applyFilters() {
    let filtered = [...this.product];

    // Availability filter - Since inStock isn't available, we'll skip this for now
    if (this.filters.availability === 'inStock') {
      console.warn('inStock filter not implemented: ProductModel lacks inStock property');
    }

    // Price filter
    if (this.filters.priceMin !== null) {
      filtered = filtered.filter(item => parseFloat(item.price) >= this.filters.priceMin!);
    }
    if (this.filters.priceMax !== null) {
      filtered = filtered.filter(item => parseFloat(item.price) <= this.filters.priceMax!);
    }

    this.applySort(filtered);
    this.productsSubject.next(filtered);
  }

  applySort(products = this.productsSubject.value) {
    let sorted = [...products];

    switch (this.sortOption) {
      case 'alphaAsc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alphaDesc':
        sorted.sort((a, b) => b.name.localeCompare(b.name));
        break;
      case 'priceAsc':
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'priceDesc':
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'dateAsc':
        console.warn('Date sorting not implemented: ProductModel lacks date property');
        break;
      case 'dateDesc':
        console.warn('Date sorting not implemented: ProductModel lacks date property');
        break;
    }

    this.productsSubject.next(sorted);
  }

  clearFilter(filterType: string) {
    switch (filterType) {
      case 'availability':
        this.filters.availability = '';
        break;
      case 'price':
        this.filters.priceMin = null;
        this.filters.priceMax = null;
        break;
    }
    this.applyFilters();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: message, action: action },
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
    });
  }

  comparing(path: string, category: string) {
    return path.toLowerCase() === category.toLowerCase();
  }

  saveSelectedItemToLocalStorage(item: ProductModel) {
    const selectedItem = JSON.stringify(item);
    this.document.defaultView?.localStorage.setItem('selectedItem', selectedItem);
    window.location.assign('details');
  }

  loadCategoryFromLocalStorage() {
    const category = this.document.defaultView?.localStorage.getItem('category');
    if (category) {
      this.category = JSON.parse(category);
    }
  }

  addToCart(productId: string | undefined, flag: string) {
    const data = this.document.defaultView?.localStorage.getItem('auth_token');
    let user = '';
    if (data) {
      user = JSON.parse(data).id;
    }
    if (productId) {
      this.service.addToCart(productId, flag, user).subscribe(() => {
        this.openSnackBar('Produit a été ajouté au panier', 'fermer');
      });
    }
  }

  toggleFavourite(productId: string | undefined) {
    const data = this.document.defaultView?.localStorage.getItem('auth_token');
    let user = '';
    if (data) {
      user = JSON.parse(data).id;
    }
    if (productId) {
      this.service.toggleFavourite(productId, user).subscribe(() => {
        this.openSnackBar('Changement a été fait avec succès', 'fermer');
      });
    }
  }
}
