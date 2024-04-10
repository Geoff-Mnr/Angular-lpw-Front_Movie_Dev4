import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../models/movie.interface";
import { Pagination } from "../models/pagination.interface";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private baseUri = "http://127.0.0.1:8000/api";

  http = inject(HttpClient);

  constructor() {}

  // Méthode pour récupérer la liste des films
  listMovies(page: number = 1, perPage: number = 10, search: string = ""): Observable<any> {
    let params = new HttpParams().set("page", page.toString()).set("per_page", perPage.toString());
    if (search) {
      params = params.set("q", search);
    }

    return this.http.get<any>(`${this.baseUri}/movies`, { params });
  }

  // Méthode pour ajouter un film
  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUri}/movies`, movie);
  }

  // Méthode pour modifier un film
  update(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUri}/movies/${id}`, movie);
  }

  // Méthode pour supprimer un film
  delete(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.baseUri}/movies/${id}`);
  }
}
