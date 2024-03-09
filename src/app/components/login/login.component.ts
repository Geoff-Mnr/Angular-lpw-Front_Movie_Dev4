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

  toaster = inject(ToastrService);

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log(response);
          if (response.type === "success") {
            localStorage.setItem("token", response.access_token);
            this.toaster.success("Connexion réussie", "Félicitations !");
            return this.router.navigate(["/"]);
          } else {
            this.toaster.error(response.message, "E-mail ou mot de passe incorrect.");
            return false;
          }
        },
        error: (error) => {
          this.toaster.error("E-mail ou mot de passe incorrect.", "Erreur de connexion.");
          console.log(error);
        },
      });
    }
  }
}
