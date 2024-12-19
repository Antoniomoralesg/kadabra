import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, MatIconModule], 
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(form: NgForm) {
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        title: 'Error en el registro',
        text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (
      this.authService.register(
        this.username,
        this.password,
        this.email,
        this.firstName,
        this.lastName
      )
    ) {
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Te has registrado con éxito. Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      });
    } else {
      Swal.fire({
        title: 'Error en el registro',
        text: 'El nombre de usuario ya existe. Por favor, elige otro.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}