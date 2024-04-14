import { Component, inject } from "@angular/core";
import { DirectorService } from "../../services/director.service";
import { Director } from "../../models/director.interface";
import { RouterLink } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AddEditFormDirectorComponent } from "../add-edit-form-director/add-edit-form-director.component";
import { NavbarComponent } from "../navbar/NavbarComponent";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-list-directors",
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, RouterOutlet, HttpClientModule, CommonModule, FormsModule, AddEditFormDirectorComponent, NavbarComponent],
  templateUrl: "./list-directors.component.html",
  styleUrl: "./list-directors.component.scss",
})
export class ListDirectorsComponent implements OnDestroy {
  directorService = inject(DirectorService);
  authService = inject(AuthService);
  router = inject(Router);

  selectedDirector?: Director;
  private subDelete: Subscription | undefined;

  toaster = inject(ToastrService);

  directors: Director[] = [];
  currentPage = 1;
  totalPage = 1;
  totalItems = 1;
  itemsPerPage = 10;
  search: string = "";

  displayForm = false;

  isAdmin: boolean = false;

  ngOnInit() {
    const savedItemsPerPage = localStorage.getItem("itemsPerPage");
    if (savedItemsPerPage) {
      this.itemsPerPage = parseInt(savedItemsPerPage, 10);
    }
    this.getAllDirectors();
    this.isAdmin = this.authService.isAdmin();
  }

  //search method to search for a director
  searchDirector() {
    this.getAllDirectors(this.currentPage);
    console.log(this.search);
  }

  getAllDirectors(page: number = 1) {
    console.log(page, this.itemsPerPage, this.search);
    this.directorService.listDirectorsWithPagination(page, this.itemsPerPage, this.search).subscribe({
      next: (response) => {
        // Mise à jour de l'état du composant avec les données reçues
        this.directors = response.data.data;
        console.log(response);
        this.totalItems = response.data.total;
        this.totalPage = response.data.last_page;

        if (this.totalItems === 0) {
          this.toaster.info("Aucun réalisateur trouvé", "Information");
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
    this.getAllDirectors();
  }

  selectDirector(director: Director) {
    this.selectedDirector = director;
    console.log(this.selectedDirector);
  }

  updateDirector(item: Director) {
    this.subDelete = this.directorService.updateDirector(item.id, item).subscribe({
      next: () => {
        this.toaster.success("Le réalisateur a été mis à jour avec succès");
        this.getAllDirectors();
        this.closeEditForm();
      },
      error: (error) => {
        this.toaster.error("Une erreur est survenue lors de la mise à jour du réalisateur");
        console.error(error);
      },
    });
  }

  createDirector(item: Director) {
    this.subDelete = this.directorService.createDirector(item).subscribe({
      next: () => {
        this.toaster.success("Le réalisateur a été ajouté avec succès");
        this.getAllDirectors();
        this.closeAddForm();
        this.closeEditForm();
      },
      error: (error) => {
        this.toaster.error("Une erreur est survenue lors de l'ajout du réalisateur");
        console.error(error);
      },
    });
  }

  deleteDirector(item: Director) {
    this.subDelete?.unsubscribe();
    this.subDelete = this.directorService.deleteDirector(item.id).subscribe({
      next: () => {
        this.toaster.success("Le réalisateur a été supprimé avec succès");
        this.getAllDirectors();
      },
      error: (error) => {
        let message = "Une erreur est survenue lors de la suppression du réalisateur";
        if (error.status === 403) {
          message = "Vous n'êtes pas autorisé à supprimer cet réalisateur";
        }
        this.toaster.error(message);
        console.error(error);
      },
    });
  }

  private closeAddForm() {
    this.displayForm = false;
  }

  private closeEditForm() {
    this.selectedDirector = undefined;
  }

  cancel() {
    this.closeAddForm();
    this.closeEditForm();
    this.toaster.info("Opération annulée");
  }

  ngOnDestroy() {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
