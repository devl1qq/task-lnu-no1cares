import { Component, Input } from '@angular/core';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem],
})
export class UserMenuComponent {
  @Input() userName!: string;

  constructor(private _auth: AuthService) {}

  signOut(): void {
    this._auth.signOut();
  }
}
