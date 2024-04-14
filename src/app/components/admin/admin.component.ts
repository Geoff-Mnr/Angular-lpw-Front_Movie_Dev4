import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { User } from "../../models/user.interface";
import { UserService } from "../../services/user.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.scss",
})
export class AdminComponent {}
