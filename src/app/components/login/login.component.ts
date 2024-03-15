import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterOutlet, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, HttpClientModule, RegisterComponent, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  // Injection du service Router
  router = inject(Router);
  // Injection du service AuthService
  authService = inject(AuthService);

  // Injection du service ToastrService
  toaster = inject(ToastrService);

  // Création du formulaire de connexion
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });

  // Méthode appelée lors de la soumission du formulaire
  login() {
    const token = localStorage.getItem("token");
    const expireToken = localStorage.getItem("expireToken");
    if (token && expireToken) {
      const expireDate = new Date(expireToken);
      const currentDate = new Date();
      const maxTokenLife = 12 * 60 * 60 * 1000;
      if (expireDate > currentDate) {
        const timeLeft = expireDate.getTime() - currentDate.getTime();

        if (timeLeft <= maxTokenLife) {
          this.toaster.info("Vous êtes déjà connecté.", "Information");
          this.router.navigate(["/movies"]);
          return;
        } else {
          this.toaster.error("Votre session est expirée. Veuillez vous reconnecter.", "Session expirée");
        }
      } else {
        this.toaster.error("Votre session est expirée. Veuillez vous reconnecter.", "Session expirée");
      }
    }

    // Récupération des valeurs du formulaire
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    if (email && password) {
      // Appel de la méthode login du service AuthService
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log("Réponse de l'API:", response);
          if (response.data && response.data.access_token) {
            // Token expire dans 12 heures
            const expireToken = new Date();
            expireToken.setHours(expireToken.getHours() + 12);
            // Enregistrement du token dans le localStorage
            localStorage.setItem("token", response.data.access_token);
            // Enregistrement de la date d'expiration du token dans le localStorage
            localStorage.setItem("expireToken", expireToken.toString());
            // Redirection vers la page d'accueil
            this.toaster.success("Connexion réussie", "Félicitations !");
            this.router.navigate(["/movies"]);
          } else {
            // Affichage d'un message d'erreur
            console.error("Token non trouvé dans la réponse");
            this.toaster.error("Un problème est survenu lors de la connexion.", "Erreur");
          }
        },
        // Gestion des erreurs
        error: (error) => {
          this.toaster.error("E-mail ou mot de passe incorrect.", "Erreur de connexion.");
          console.error(error);
        },
      });
    }
  }
}
