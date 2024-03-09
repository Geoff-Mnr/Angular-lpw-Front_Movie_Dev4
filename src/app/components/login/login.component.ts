import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);

  login: string = '';
  password: string = '';

  connection() {
    this.authService.login(this.login, this.password).subscribe((res: any) => {
      if (res.secret) {
        console.log('You are connected');
      }
    });
  }
}
