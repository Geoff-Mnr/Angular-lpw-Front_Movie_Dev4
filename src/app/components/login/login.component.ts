import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, HttpClientModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // Injection du service ToastrService
  toaster = inject(ToastrService);

  // Création du formulaire de connexion
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });

  login() {
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
            this.router.navigate(["/"]);
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
