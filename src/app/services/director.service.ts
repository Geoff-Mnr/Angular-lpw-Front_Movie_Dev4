import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Director } from "../models/director.interface";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DirectorService {
  private baseUri = "http://127.0.0.1:8000/api";
  // Declare http as HttpClient
  http = inject(HttpClient);

  constructor() {}

  // Méthode pour récupérer la liste des réalisateurs
  listDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.baseUri}/listdirectors`);
  }

  // Méthode pour ajouter un réalisateur
  createDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(`${this.baseUri}/directors`, director);
  }
}
