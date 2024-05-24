import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {
  }

  addComment(id: string, mode: string) {
    const body = { userId: id, method: mode };
    return this.http.post(`${this.apiUrl}/product/commande`, body);
  }
}
