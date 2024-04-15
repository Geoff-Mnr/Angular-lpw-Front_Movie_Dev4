import { Component, inject } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { DirectorService } from "../../services/director.service";
import { Movie } from "../../models/movie.interface";
import { RouterLink } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { AddEditFormComponent } from "../add-edit-form/add-edit-form.component";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-list-movies",
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, AddEditFormComponent, RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: "./list-movies.component.html",
  styleUrl: "./list-movies.component.scss",
})
export class ListMoviesComponent implements OnDestroy {
  movieService = inject(MovieService);
  router = inject(Router);
  directorService = inject(DirectorService);

  selectedMovie?: Movie;
  private subDelete: Subscription | undefined;

  toaster = inject(ToastrService);

  movies: Movie[] = [];
  currentPage = 1;
  totalPage = 1;
  totalItems = 1;
  itemsPerPage = 10;
  search: string = "";

  displayForm = false;

  ngOnInit() {
    const savedItemsPerPage = localStorage.getItem("itemsPerPage");
    if (savedItemsPerPage) {
      this.itemsPerPage = parseInt(savedItemsPerPage, 10);
    }
    this.getAllMovies();
  }

  //search method to search for a movie
  searchMovie() {
    this.getAllMovies(this.currentPage);
    console.log(this.search);
  }

  /*Methode pour afficher le formulaire d'ajout*/
  getAllMovies(page: number = 1) {
    console.log(page, this.itemsPerPage, this.search);
    this.subDelete = this.movieService.listMoviesByUser(page, this.itemsPerPage, this.search).subscribe({
      next: (response) => {
        // Mise à jour de l'état du composant avec les données reçues
        this.movies = response.data.data;
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

  onItemsPerPageChange() {
    localStorage.setItem("itemsPerPage", this.itemsPerPage.toString());
    this.getAllMovies();
  }

  // Méthode pour sélectionner un film
  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    console.log(this.selectedMovie);
  }
  // Méthode pour mettre à jour un film
  updateMovie(item: Movie) {
    this.subDelete = this.movieService.update(item.id, item).subscribe({
      next: () => {
        this.toaster.success("Film modifié avec succès", "Félicitations !");
        console.log("Movie updated successfully");
        this.getAllMovies();
        this.closeEditForm();
      },
      error: (error) => {
        this.toaster.error("Erreur lors de la modification du film", "Erreur");
        console.error("Error updating movie:", error);
      },
    });
  }
  // Méthode pour créer un film
  createMovie(item: Movie) {
    this.subDelete = this.movieService.create(item).subscribe({
      next: () => {
        this.toaster.success("Film ajouté avec succès", "Félicitations !");
        console.log("Movie created successfully");
        this.getAllMovies();
        this.closeAddForm();
        this.closeEditForm();
      },
      error: (error) => {
        this.toaster.error("Erreur lors de la création du film", "Erreur");
        console.error("Error creating movie:", error);
      },
    });
  }

  // Méthode pour supprimer un film
  deleteMovie(item: Movie) {
    this.subDelete = this.movieService.delete(item.id).subscribe({
      next: () => {
        this.toaster.success("Film supprimé avec succès", "Félicitations !");
        console.log("Movie deleted successfully'");
        this.getAllMovies();
      },
      error: (error) => {
        this.toaster.error("Erreur lors de la suppression du film", "Erreur");
        console.error("Error deleting movie:", error);
      },
    });
  }

  private closeAddForm() {
    this.displayForm = false;
  }

  /*Methode pour fermer le formulaire de modification*/
  private closeEditForm() {
    this.selectedMovie = undefined;
  }

  // Méthode pour annuler une opération
  cancel() {
    this.closeAddForm();
    this.closeEditForm();
    this.toaster.info("Opération annulée", "Information");
  }

  // Méthode pour détruire le composant
  ngOnDestroy(): void {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
