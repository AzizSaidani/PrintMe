import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartModel} from "../../models/cart.model";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = environment.BACKEND_URL + '/api';

  generateBill(cartItems: CartModel[]): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/product/generateBill`, {products: cartItems}, {responseType: 'blob'});
  }


}
