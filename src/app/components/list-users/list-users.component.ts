import { Component, inject } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.interface";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { OnDestroy } from "@angular/core";

@Component({
  selector: "app-list-users",
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: "./list-users.component.html",
  styleUrl: "./list-users.component.scss",
})
export class ListUsersComponent implements OnDestroy {
  userService = inject(UserService);
  router = inject(Router);
  private subDelete: Subscription | undefined;
  toaster = inject(ToastrService);

  users: User[] = [];
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
    this.getListUsers();
  }

  searchUser() {
    this.getListUsers(this.currentPage);
    console.log(this.search);
  }

  getListUsers(page: number = 1) {
    console.log(page, this.itemsPerPage, this.search);
    this.subDelete = this.userService.listUsersWithPagination(page, this.itemsPerPage, this.search).subscribe({
      next: (response) => {
        this.users = response.data.data;
        console.log(this.users);
        this.totalItems = response.data.total;
        this.totalPage = response.data.last_page;

        if (this.totalItems === 0) {
          this.toaster.info("Aucun utilisateur trouvé", "Information");
        }
        this.currentPage = page < 1 ? 1 : page > this.totalPage ? this.totalPage : page;
      },
      error: (error) => {
        this.toaster.error("Une erreur est survenue lors de la récupération des utilisateurs", "Erreur");
      },
    });
  }

  onItemsPerPageChange() {
    localStorage.setItem("itemsPerPage", this.itemsPerPage.toString());
    this.getListUsers();
  }

  ngOnDestroy() {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
