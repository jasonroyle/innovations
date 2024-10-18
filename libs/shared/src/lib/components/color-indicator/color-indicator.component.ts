import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'innov-color-indicator',
  templateUrl: './color-indicator.component.html',
  styleUrl: './color-indicator.component.scss',
})
export class ColorIndicatorComponent {
  @HostBinding('class') get paletteClass(): string[] {
    return [`palette-${this.palette}`.toLowerCase(), `tone-${this.tone}`];
  }
  @Input() palette?: string;
  @HostBinding('title') get title(): string {
    return `${this.palette}`;
  }
  @Input() tone = 500;
}
