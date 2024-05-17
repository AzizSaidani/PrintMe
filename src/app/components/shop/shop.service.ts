import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ProductModel} from "../../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  private selectedProductSubject = new BehaviorSubject<ProductModel | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  setSelectedProduct(product: ProductModel) {
    this.selectedProductSubject.next(product);
  }

  clearSelectedProduct() {
    this.selectedProductSubject.next(null);
  }

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:3000/api';


  loadProduct(): Observable<ProductModel[]> {
    return this.http.get<any>(`${this.apiUrl}/product/load`)
      .pipe(
        map(data => data as ProductModel[])
      );
  }
}
