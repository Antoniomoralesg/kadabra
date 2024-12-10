import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  template: `
    <button
      class="bg-yellow-400 text-white w-full border px-5 py-2 rounded-xl shadow-md hover:opacity-90"
      (click)="btnClicked.emit()"
    >
      <ng-content></ng-content>
      {{ label }}
    </button>
  `,
  styles: [],
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Output() btnClicked = new EventEmitter<void>();
}
