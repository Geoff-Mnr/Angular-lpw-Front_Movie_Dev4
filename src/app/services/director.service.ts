import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Director } from "../models/director.interface";

@Injectable({
  providedIn: "root",
})
export class DirectorService {
  private baseUri = "http://127.0.0.1:8000/api";
  // Declare http as HttpClient
  http = inject(HttpClient);

  constructor() {}

  // Méthode pour récupérer la liste des réalisateurs
  getAllDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.baseUri}/directors`);
  }

  // Méthode pour ajouter un réalisateur
  createDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(`${this.baseUri}/directors`, director);
  }
}
