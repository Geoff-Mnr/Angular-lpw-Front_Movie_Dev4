import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../models/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUri = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${this.baseUri}/login`, { email, password }).pipe(
      tap((res: any) => {
        console.log(res.access_token);
        localStorage.setItem("token", res.access_token); //
      })
    );
  }

  // Méthode pour récupérer les informations de l'utilisateur
  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    return this.http.get<User>(`${this.baseUri}/user`, { headers });
  }

  // Méthode d'inscription
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUri}/register`, { email, password });
  }

  // Méthode de déconnexion
  logout(): void {
    localStorage.removeItem("token");
  }
}
