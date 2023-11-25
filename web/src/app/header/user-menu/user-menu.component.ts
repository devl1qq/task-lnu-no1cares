// user-menu.component.ts
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  @Input() userName!: string;
  isSidebarExpanded = false;

  constructor(private _auth: AuthService) {}

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  closeSidebar(): void {
    this.isSidebarExpanded = false;
    // Add implementation
  }

  openSettings(): void {
    // Add implementation
  }

  openHelp(): void {
    // Add implementation
  }

  signOut(): void {
    this._auth.signOut();
  }
}
