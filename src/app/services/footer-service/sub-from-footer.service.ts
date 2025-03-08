import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class SubFromFooterService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = environment.BACKEND_URL+'/api/subscription/subscribe';

  subscribe(email: string) {
    return this.http.post(`${this.apiUrl}`, {email, tag: 'add'});
  }
}
