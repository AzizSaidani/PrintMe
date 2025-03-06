import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl = 'https://printme-back.vercel.app/api/subscription';

  constructor(private http: HttpClient) {
  }

  subscribe(email: string,tag:string) {
    return this.http.post(`${this.apiUrl}/subscribe`, {email,tag});
  }
  getStatus(email:string){
    const url = `${this.apiUrl}/status?email=${email}`;
    return this.http.get<{ isSubscribed: boolean }>(url);

  }
}
