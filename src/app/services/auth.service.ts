import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../models/user.interface";
import { verifyToken } from "../models/verifyToken";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUri = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${this.baseUri}/login`, { email, password }).pipe(
      tap((res: any) => {
        console.log(res.access_token);
        localStorage.setItem("token", res.access_token); //
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUri}/register`, { email, password });
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
