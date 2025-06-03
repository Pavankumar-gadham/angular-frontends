import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = `${environment.apiUrl}/register/`;
  private loginUrl = `${environment.apiUrl}/token/`;
  private refreshUrl = `${environment.apiUrl}/token/refresh/`;

  private _isLoggedIn = false;

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');
    this._isLoggedIn = !!token;
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this._isLoggedIn = true;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post(this.refreshUrl, { refresh }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access);
      })
    );
  }
}
