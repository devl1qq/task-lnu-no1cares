import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {
  @Input() x = 0;
  @Input() y = 0;
  @Input() data: { name: string; action: () => void }[] = [];

  constructor() {}
}
