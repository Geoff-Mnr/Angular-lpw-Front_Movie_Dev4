import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toaster = inject(ToastrService);

  constructor() {}

  // Méthode pour déconnecter l'utilisateur
  logout() {
    this.authService.logout();
    this.toaster.info("Déconnexion réussie", "Information");
    this.router.navigate(["/login"]);
    console.log("User logged out successfully");
  }
}
