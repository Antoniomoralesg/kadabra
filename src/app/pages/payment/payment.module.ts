import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';
import { PaymentAddressComponent } from './payment-address/payment-address.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { PaymentDoneComponent } from './payment-done/payment-done.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaymentComponent,
        children: [
          { path: '', redirectTo: 'address', pathMatch: 'full' },
          { path: 'address', component: PaymentAddressComponent },
          { path: 'method', component: PaymentMethodComponent },
          { path: 'confirmation', component: PaymentConfirmationComponent },
          { path: 'done', component: PaymentDoneComponent },
        ],
      },
    ]),
    PaymentComponent, 
    PaymentAddressComponent, 
    PaymentMethodComponent, 
    PaymentConfirmationComponent, 
    PaymentDoneComponent, 
  ],
})
export class PaymentModule {}
