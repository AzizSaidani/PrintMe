import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartModel} from "../../models/cart.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'https://printme-back.vercel.app/api/';

  generateBill(cartItems: CartModel[]): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/product/generateBill`, {products: cartItems}, {responseType: 'blob'});
  }



}
