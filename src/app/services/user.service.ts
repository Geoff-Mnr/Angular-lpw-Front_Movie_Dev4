import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.interface";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  private baseUri = "http://127.0.0.1:8000/api";

  http = inject(HttpClient);

  // Méthode pour récupérer la liste des utilisateurs
  listUsersWithPagination(page: number = 1, perPage: number = 10, search: string = ""): Observable<any> {
    let params = new HttpParams().set("page", page.toString()).set("per_page", perPage.toString());
    if (search) {
      params = params.set("q", search);
    }

    return this.http.get<any>(`${this.baseUri}/users`, { params });
  }

  getProfileUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUri}/getprofile`);
  }

  isActif(id: number): Observable<any> {
    return this.http.put<User>(`${this.baseUri}/users/${id}`, { is_active: 0 });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUri}/users/${id}`);
  }
}
