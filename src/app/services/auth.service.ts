import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.interface";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // URL de base de l'API
  private baseUri = "http://127.0.0.1:8000/api";

  // Injection de HttpClient via le constructeur
  http = inject(HttpClient);

  // Méthode pour vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  // Méthode pour stocker le token dans le localStorage
  setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${this.baseUri}/login`, { email, password });
  }

  // Méthode pour récupérer le profil de l'utilisateur
  getProfile(): Observable<User> {
    const token = localStorage.getItem("token");
    if (!token) {
      return throwError(() => new Error("Authentication token not found"));
    }

    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<User>(`${this.baseUri}/user`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => new Error("An error occurred while fetching user profile"));
      })
    );
  }

  // Méthode d'inscription
  register(username: string, email: string, password: string, confirm_password: string): Observable<any> {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);
    return this.http.post<User>(`${this.baseUri}/register`, formData);
  }

  // Méthode de déconnexion
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenReceivedAt");
    localStorage.removeItem("user");
  }
}
