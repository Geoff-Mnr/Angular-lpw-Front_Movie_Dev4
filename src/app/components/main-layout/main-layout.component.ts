import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { NavbarComponent } from "../navbar/NavbarComponent";
import { RouterOutlet } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent, RouterOutlet],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.scss",
})
export class MainLayoutComponent {
  router = inject(Router);
}
