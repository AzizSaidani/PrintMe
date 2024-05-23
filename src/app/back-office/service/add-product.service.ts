import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Contact} from "../../models/reclamation.model";
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {
  }

  uploadImage(vals: any): Observable<any> {
    return this.http.post("https://api.cloudinary.com/v1_1/dwkp2dnfs/upload", vals)
  }


  addProduct(productData: any) {
    return this.http.post(`${this.apiUrl}/product/add`, productData);
  }

  loadReclamation(): Observable<Contact[]> {
    return this.http.get<any>(`${this.apiUrl}/visitor/loadContact`)
      .pipe(
        map(data => data as Contact[])
      );
  }
  loadUsers(): Observable<UserModel[]> {
    return this.http.get<any>(`${this.apiUrl}/auth/loadUsers`)
      .pipe(
        map(data => data as UserModel[])
      );
  }
}
