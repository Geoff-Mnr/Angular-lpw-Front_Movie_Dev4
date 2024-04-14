import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { RouterOutlet } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { NavbarComponent } from "../navbar/NavbarComponent";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, NavbarComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
