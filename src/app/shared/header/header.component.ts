import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../add-note-dialog/add-note-dialog.component.scss']
})
export class HeaderComponent {
  @Output() openNoteChange: EventEmitter<boolean> = new EventEmitter();
  hoveredAddBtn = false;
  showUserMenu = false;

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }

  async deleteAccount() {
    await this.auth.deleteAccount();
    this.showUserMenu = false;
    this.router.navigate(['/login']);
  }
}
