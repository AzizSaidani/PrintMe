import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private apiUrl = 'http://localhost:3000/api/product';


  constructor(private http: HttpClient) {
  }

  uploadImage(vals: any): Observable<any> {

    return this.http.post("https://api.cloudinary.com/v1_1/dwkp2dnfs/upload", vals)
  }


  addProduct(productData:any){
    return this.http.post(`${this.apiUrl}/add`, productData);
  }
}
