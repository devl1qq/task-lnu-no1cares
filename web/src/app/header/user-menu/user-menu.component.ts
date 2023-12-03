import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  @Input() userName!: string;
  isSidebarExpanded = false;
  isHelpPopupOpen = false;
  isSettingsPopupOpen = false;
  helpMessage: string = '';
  isLogsCleared = false; // New property to track logs cleared state

  constructor(private _auth: AuthService, private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.ownerDocument.body.classList.add('sidebar-not-expanded');
  }

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;

    if (this.isSidebarExpanded) {
      this.el.nativeElement.ownerDocument.body.classList.remove('sidebar-not-expanded');
      this.el.nativeElement.ownerDocument.body.classList.add('sidebar-expanded-body');
    } else {
      this.el.nativeElement.ownerDocument.body.classList.remove('sidebar-expanded-body');
      this.el.nativeElement.ownerDocument.body.classList.add('sidebar-not-expanded');
    }
  }

  openSettings(): void {
    this.isSettingsPopupOpen = true;
    const settingsPopup = document.querySelector('.settings-popup') as HTMLElement;
    settingsPopup.style.display = 'block';
  }

  closeSettingsPopup(): void {
    this.isSettingsPopupOpen = false;
    const settingsPopup = document.querySelector('.settings-popup') as HTMLElement;
    settingsPopup.style.display = 'none';
  }

  clearUserLogs(): void {
    // Simulate API request
    console.log("Simulating API request to clear user logs...");

    // Update the button state
    this.isLogsCleared = true;

    // Reset the button state after 3 seconds
    setTimeout(() => {
      this.isLogsCleared = false;
    }, 3000);
  }

  openHelp(): void {
    this.isHelpPopupOpen = true;
    const helpPopup = document.querySelector('.help-popup') as HTMLElement;
    helpPopup.style.display = 'block';
  }

  closeHelpPopup(): void {
    this.isHelpPopupOpen = false;
    const helpPopup = document.querySelector('.help-popup') as HTMLElement;
    helpPopup.style.display = 'none';
  }

  onSendMessage(): void {
    console.log("Message sent to support:", this.helpMessage);
    this.closeHelpPopup();
  }

  onCancel(): void {
    this.closeHelpPopup();
  }

  signOut(): void {
    this._auth.signOut();
  }
}
