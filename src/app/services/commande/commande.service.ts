import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl =environment.BACKEND_URL+ '/api';

  constructor(private http: HttpClient) {
  }

  addCommande(id: string, mode: string) {
    const body = { userId: id, method: mode };
    return this.http.post(`${this.apiUrl}/product/commande`, body);
  }

  getCommandeByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/product/loadCommande/${userId}`;
    return this.http.get(url);
  }
}
