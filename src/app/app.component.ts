import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, SliderComponent],
  template: `
    <app-header />
    <app-slider />
    <router-outlet />
    
    <app-footer />
  `,
  styles: ``,
})
export class AppComponent {
  title = 'angular-ecomm';
}
