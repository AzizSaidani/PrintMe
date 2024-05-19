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
}
