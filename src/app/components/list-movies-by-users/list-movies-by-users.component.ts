import { Component } from "@angular/core";
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
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { inject } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { Route } from "@angular/router";

@Component({
  selector: "app-list-movies-by-users",
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, AddEditFormComponent, RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: "./list-movies-by-users.component.html",
  styleUrl: "./list-movies-by-users.component.scss",
})
export class ListMoviesByUsersComponent implements OnDestroy {
  constructor(private movieService: MovieService, private router: Router, private directorService: DirectorService, private toaster: ToastrService, private route: ActivatedRoute) {}

  selectedMovie?: Movie;
  private subDelete: Subscription | undefined;

  movies: Movie[] = [];
  currentPage = 1;
  totalPage = 1;
  totalItems = 1;
  itemsPerPage = 10;
  search: string = "";

  ngOnInit() {
    const savedItemsPerPage = localStorage.getItem("itemsPerPage");
    if (savedItemsPerPage) {
      this.itemsPerPage = parseInt(savedItemsPerPage, 10);
    }
    this.getListMoviesByUser();
  }

  searchMovie() {
    this.getListMoviesByUser(this.currentPage);
    console.log(this.search);
  }

  getListMoviesByUser(page: number = 1) {
    const userId = Number(this.route.snapshot.paramMap.get("id")); // Récupérer l'ID de l'utilisateur à partir de l'URL
    this.subDelete = this.movieService.listMoviesByUserId(userId, page, this.itemsPerPage, this.search).subscribe({
      next: (response) => {
        console.log(response.data.data);
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
    this.getListMoviesByUser();
  }

  ngOnDestroy() {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
