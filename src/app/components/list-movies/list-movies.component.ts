import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.interface';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: "app-list-movies",
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, AddEditFormComponent],
  templateUrl: "./list-movies.component.html",
  styleUrl: "./list-movies.component.scss",
})
export class ListMoviesComponent {

service = inject(MovieService);
selectedMovie?: Movie;
private subscription: Subscription;

movies: Movie[] = [];

displayForm = false;

ngOnInit() {
  this.getAllMovies();
}

getAllMovies() {
  this.subscription = this.service.getMovies().subscribe({
    next: (response) => {
      this.movies = response;
    },
    error: (error) => {
      console.error(error);
    },
  });

  selectedMovie(item: Movie){
    this.selectedMovie = item;
    console.log(this.selectedMovie);
}

updateMovie(item: Movie) {
  this.subDelete = this.service.updateMovie(item.id, item).subscribe({
    next: () => {
      console.log('Movie updated successfully');
      this.getAllMovies();
      this.closeEditForm();
    },
    error: (error) => {
      console.error('Error updating movie:', error);
    }
  });
}

createMovie(item: Movie) {
  this.subDelete = this.service.createMovie(item).subscribe({
    next: () => {
      console.log("Movie created successfully");
      this.getAllMovies();
      this.closeAddForm();
      this.closeEditForm();
    },
    error: (error) => {
      console.error("Error creating movie:", error);
    },
  });
}


  // Méthode pour supprimer un film
  deleteMovie(item: Movie) {
    this.subscription = this.service.deleteMovie(item.id).subscribe({
      next: () => {
        console.log("Movie deleted successfully'");
        this.getAllMovies();
      },
      error: (error) => {
        console.error('Error deleting movie:', error);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
