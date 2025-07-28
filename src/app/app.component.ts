import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NoteListComponent, FooterComponent, HeaderComponent, AddNoteDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DAKeep';
  addDialogOpen = false;
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      // Wenn kein User eingeloggt ist und wir nicht schon auf /login oder /register sind:
      const currentUrl = this.router.url;
      if (!user && currentUrl !== '/login' && currentUrl !== '/register') {
        this.router.navigate(['/login']);
      }
    });
  }

  isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/register';
  }
}