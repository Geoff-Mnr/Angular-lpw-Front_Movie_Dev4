import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { RouterLinkActive } from "@angular/router";
import { User } from "../../models/user.interface";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  toaster = inject(ToastrService);

  constructor() {}

  user: any;

  // Méthode pour déconnecter l'utilisateur
  logout() {
    this.authService.logout();
    this.toaster.info("Déconnexion réussie", "Information");
    this.router.navigate(["/login"]);
    console.log("User logged out successfully");
  }

  ngOnInit() {
    this.userService.getProfileUser().subscribe({
      next: (res) => {
        this.user = res;
        console.log("User profile", this.user);
      },
      error: (err) => {
        console.log("Error while fetching user profile", err);
      },
    });
  }
}
