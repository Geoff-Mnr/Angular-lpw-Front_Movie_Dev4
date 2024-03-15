import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { nospaceValidator } from "../../validators/nospace";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, HttpClientModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  router = inject(Router);
  authService = inject(AuthService);
  toaster = inject(ToastrService);

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), nospaceValidator]),
    confirm_password: new FormControl("", [Validators.required, Validators.minLength(8), nospaceValidator]),
  });

  register() {
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let confirm_password = this.registerForm.value.confirm_password;

    if (password !== confirm_password) {
      this.toaster.error("Les mots de passe ne correspondent pas.", "Erreur");
      return;
    }

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
