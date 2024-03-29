import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { nospaceValidator } from "../../validators/nospace";
import { ValidatorFn, ValidationErrors } from "@angular/forms";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, HttpClientModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  // Injection du service Router
  router = inject(Router);
  // Injection du service AuthService
  authService = inject(AuthService);
  // Injection du service ToastrService
  toaster = inject(ToastrService);

  passwordMatch: ValidatorFn = (control) => {
    const password = control.get("password");
    const confirm_password = control.get("confirm_password");

    // Si les deux champs sont remplis et que les valeurs sont différentes
    if (password && confirm_password && password.value !== confirm_password.value) {
      if (confirm_password) {
        confirm_password.setErrors({ passwordMatch: true });
      }
      // Sinon, on réinitialise les erreurs
    } else {
      if (confirm_password) {
        confirm_password.setErrors(null);
      }
    }
    return null;
  };

  // Création du formulaire d'inscription
  registerForm = new FormGroup(
    {
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), nospaceValidator()]),
      confirm_password: new FormControl("", [Validators.required, Validators.minLength(8), nospaceValidator()]),
    },
    { validators: this.passwordMatch }
  );

  // Méthode appelée lors de la soumission du formulaire
  register() {
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let confirm_password = this.registerForm.value.confirm_password;

    if (email && password && confirm_password) {
      this.authService.register(email, password, confirm_password).subscribe({
        next: (response) => {
          this.toaster.success("Inscription réussie !", "Succès");
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.toaster.error("Erreur lors de l'inscription.", "Erreur");
        },
      });
    }
  }
}
