import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.authService.login(this.username, this.password)) {
      Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f97316',
      });
    }
  }
}