import { Component, inject } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { Movie, MovieWithCreator } from "../../models/movie.interface";
import { CommonModule, DatePipe } from "@angular/common";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-list-all-movies",
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: "./list-all-movies.component.html",
  styleUrl: "./list-all-movies.component.scss",
})
export class ListAllMoviesComponent implements OnDestroy {
  movieService = inject(MovieService);
  router = inject(Router);
  userService = inject(UserService);
  private subDelete: Subscription | undefined;
  toaster = inject(ToastrService);

  movies: MovieWithCreator[] = [];

  currentPage = 1;
  totalPage = 1;
  totalItems = 1;
  itemsPerPage = 10;
  search: string = "";

  /* Permet de récupérer les films */
  ngOnInit() {
    const savedItemsPerPage = localStorage.getItem("itemsPerPage");
    if (savedItemsPerPage) {
      this.itemsPerPage = parseInt(savedItemsPerPage, 10);
    }
    this.getListMovies();
  }
  /* Methode de recherche de film */
  searchMovie() {
    this.getListMovies(this.currentPage);
    console.log(this.search);
  }
  /* Methode pour afficher le formulaire d'ajout */
  getListMovies(page: number = 1) {
    console.log(page, this.itemsPerPage, this.search);
    this.subDelete = this.movieService.listAllMovies(page, this.itemsPerPage, this.search).subscribe({
      next: (response) => {
        // Mise à jour de l'état du composant avec les données reçues
        this.movies = response.data.data as MovieWithCreator[];

        console.log(this.movies);
        this.totalItems = response.data.total;
        this.totalPage = response.data.last_page;

        if (this.totalItems === 0) {
          this.toaster.info("Aucun film trouvé", "Information");
        }
        this.currentPage = page < 1 ? 1 : page > this.totalPage ? this.totalPage : page;
      },
      error: (error) => {
        console.error("Une erreur est survenue lors de la récupération des films:", error);
      },
    });
  }

  /* Methode pour mettre en local storage le nombre d'item par page */
  onItemsPerPageChange() {
    localStorage.setItem("itemsPerPage", this.itemsPerPage.toString());
    this.getListMovies();
  }

  /* Methode pour se désinscrire */
  ngOnDestroy(): void {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
