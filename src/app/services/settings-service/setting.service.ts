import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl = environment.BACKEND_URL + '/api/subscription';

  constructor(private http: HttpClient) {
  }

  subscribe(email: string, tag: string) {
    return this.http.post(`${this.apiUrl}/subscribe`, {email, tag});
  }

  getStatus(email: string) {
    const url = `${this.apiUrl}/status?email=${email}`;
    return this.http.get<{ isSubscribed: boolean }>(url);

  }
}
