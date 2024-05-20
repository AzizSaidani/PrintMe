import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt'; // Install the @auth0/angular-jwt package

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  readonly TOKEN_KEY = 'auth_token';
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) {
    const userData = JSON.parse(localStorage.getItem(this.TOKEN_KEY) || '{}');
    if (userData.token) {
      const decodedToken = this.jwtHelper.decodeToken(userData.token);
      const user = {
        token: userData.token,
        username: userData.username,
        role: userData.role
      };
      this.currentUserSubject.next(user);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token; // Returns true if token exists, false otherwise
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        const username = response.username;
        const email = credentials.email;
        const role = response.role;
        const userData = {token, username, role, email};
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(userData));
        this.currentUserSubject.next(userData);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }


}
