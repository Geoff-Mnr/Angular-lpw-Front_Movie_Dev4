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
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (res) => {
          this.authService.setSession(res.data);
          console.log("Token expires at:", res.data.expires_at);
          this.router.navigate(["/home"]);
          this.toaster.success("Connexion réussie!");
        },
        error: (err) => {
          this.toaster.error("Erreur lors de la connexion.");
        },
      });
    } else {
      this.toaster.error("Veuillez remplir le formulaire correctement.");
    }
  }
}
