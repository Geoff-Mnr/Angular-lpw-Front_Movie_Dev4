import { Component, inject } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { Movie } from "../../models/movie.interface";
import { RouterLink } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { AddEditFormComponent } from "../add-edit-form/add-edit-form.component";
import { Subscription, first } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import { Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-list-movies",
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, AddEditFormComponent, RouterOutlet, HttpClientModule],
  templateUrl: "./list-movies.component.html",
  styleUrl: "./list-movies.component.scss",
})
export class ListMoviesComponent {
  service = inject(MovieService);
  authService = inject(AuthService);
  router = inject(Router);

  selectedMovie?: Movie;
  private subDelete: Subscription | undefined;

  toaster = inject(ToastrService);

  movies: Movie[] = [];

  displayForm = false;

  ngOnInit() {
    if (localStorage.getItem("firstLogin") == "true") {
      localStorage.setItem("firstLogin", "false");
      window.location.reload();
    }
    this.getAllMovies();
  }

  /*Methode pour afficher le formulaire d'ajout*/
  getAllMovies() {
    this.subDelete = this.service.list().subscribe((result: any) => {
      console.log(result);
      this.movies = result.data;
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    console.log(this.selectedMovie);
  }

  updateMovie(item: Movie) {
    this.subDelete = this.service.update(item.id, item).subscribe({
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

  createMovie(item: Movie) {
    this.subDelete = this.service.create(item).subscribe({
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
    this.subDelete = this.service.delete(item.id).subscribe({
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

  logout() {
    this.authService.logout();
    this.toaster.info("Déconnexion réussie", "Information");
    this.router.navigate(["/login"]);
  }

  private closeAddForm() {
    this.displayForm = false;
  }

  /*Methode pour fermer le formulaire de modification*/
  private closeEditForm() {
    this.selectedMovie = undefined;
  }

  cancel() {
    this.closeAddForm();
    this.closeEditForm();
    this.toaster.info("Opération annulée", "Information");
  }

  ngOnDestroy() {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
