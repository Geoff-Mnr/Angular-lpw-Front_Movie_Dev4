import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../models/movie.interface";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private baseUri = "http://127.0.0.1:8000/api";
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  http = inject(HttpClient);

  constructor() {}

  // Méthode pour récupérer la liste des films
  list(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUri}/movies`, { headers: this.headers });
  }

  // Méthode pour ajouter un film
  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUri}/movies`, movie, { headers: this.headers });
  }

  // Méthode pour modifier un film
  update(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUri}/movies/${id}`, movie, { headers: this.headers });
  }

  // Méthode pour supprimer un film
  delete(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.baseUri}/movies/${id}`, { headers: this.headers });
  }
}
