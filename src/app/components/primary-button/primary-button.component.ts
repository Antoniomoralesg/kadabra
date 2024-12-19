import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css'],
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Output() btnClicked = new EventEmitter<void>();
}