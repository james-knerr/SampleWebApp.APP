import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-component-spinner',
  templateUrl: './component-spinner.component.html',
  styleUrls: ['./component-spinner.component.scss']
})
export class ComponentSpinnerComponent {
  @Input() public busy = false;
  @Input() public busyMessage = '';
  @Input() public small = false;
  constructor() {
  }
}
