import { Component, inject } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/NavbarComponent";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RouterLink, CommonModule, NavbarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Netflox";

  router = inject(Router);
}
