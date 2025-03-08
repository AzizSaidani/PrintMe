import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.BACKEND_URL+'/api/visitor';

  constructor(private http: HttpClient) {
  }


  contact(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createContact`, data)
  }

  reclamation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createReclamation`, data)
  }
}
