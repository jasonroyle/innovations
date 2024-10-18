import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[innovHover]',
  exportAs: 'innovHover',
})
export class HoverDirective {
  public isHovered = false;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.isHovered = false;
  }
}
