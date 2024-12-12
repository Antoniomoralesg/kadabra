import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective {
  @Output() visible = new EventEmitter<void>();

  constructor(private element: ElementRef) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible.emit();
          observer.unobserve(this.element.nativeElement);
        }
      });
    });

    observer.observe(this.element.nativeElement);
  }
}
