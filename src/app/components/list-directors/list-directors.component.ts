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

  // Methode de recherche de réalisateur
  searchDirector() {
    this.getAllDirectors(this.currentPage);
  }

  // Methode pour afficher les réalisateurs
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

  // Methode pour mettre en local storage le nombre d'item par page
  onItemsPerPageChange() {
    localStorage.setItem("itemsPerPage", this.itemsPerPage.toString());
    this.getAllDirectors();
  }

  // Methode pour selectionner un réalisateur
  selectDirector(director: Director) {
    this.selectedDirector = director;
  }

  // Methode pour mettre à jour un réalisateur
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

  // Methode pour créer un réalisateur
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
      },
    });
  }

  // Methode pour supprimer un réalisateur
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
      },
    });
  }
  // Methode pour fermer le formulaire d'ajout
  private closeAddForm() {
    this.displayForm = false;
  }

  // Methode pour fermer le formulaire de modification
  private closeEditForm() {
    this.selectedDirector = undefined;
  }

  // Methode pour annuler une opération
  cancel() {
    this.closeAddForm();
    this.closeEditForm();
    this.toaster.info("Opération annulée");
  }

  // Methode pour se désinscrire
  ngOnDestroy() {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
