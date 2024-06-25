import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'innov-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrl: './master-detail.component.scss',
})
export class MasterDetailComponent {
  @Input() @HostBinding('class.master-spacing') masterSpacing = true;
  @Input() @HostBinding('class.detail-spacing') detailSpacing = true;
}
