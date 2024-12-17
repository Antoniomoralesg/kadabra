import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
      RouterModule.forChild([{ path: '', component: RegisterComponent }]),
      RegisterComponent 
    ]
  })
  export class RegisterModule { }