import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUri = 'http://127.0.0.1/api/';
  public secret?: string;
  public decodeToken?: string;

  login(email: string, password: string) {
    return this.http.post(`${this.baseUri}login`, {
      email,
      password,
    });
  }

  subscribe() {}

  setSecret(secret: string) {
    this.secret = secret;
    try {
      this.decodeToken = jwtDecode(secret);
      localStorage.setItem('token', secret);
    } catch (error) {
      this.logout();
    }
  }

  logout() {
    this.secret = undefined;
    this.decodeToken = undefined;
    localStorage.removeItem('token');
  }
}
