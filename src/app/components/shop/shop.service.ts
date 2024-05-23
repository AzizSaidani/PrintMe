import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductModel} from "../../models/product.model";
import {CommentModel} from "../../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:3000/api';


  loadProduct(): Observable<ProductModel[]> {
    return this.http.get<any>(`${this.apiUrl}/product/load`)
      .pipe(
        map(data => data as ProductModel[])
      );
  }

  loadComments(): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.apiUrl}/product/loadComments`)
      .pipe(
        map(data => data as CommentModel[])
      );
  }

  addComment(data: CommentModel) {
    return this.http.post(`${this.apiUrl}/product/comment`, data);
  }

  addToCart(productId: string, flag: string, userId: string | null, amount?: number ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/cart`, {productId, flag, userId,amount});
  }

  getCartItems(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/cart/${userId}`);
  }

  toggleFavourite(productId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/favourites/add`, {productId, userId});
  }

  getFavouriteItems(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/favourites/${userId}`);
  }


  createCheckoutSession(amount: number): Observable<{ sessionId: string }> {
    return this.http.post<{ sessionId: string }>(`${this.apiUrl}/product/create-checkout-session`, {amount});
  }


}
