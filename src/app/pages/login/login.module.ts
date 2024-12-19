import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    LoginComponent,
  ],
})
export class LoginModule {}
