import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-login">
      <form (ngSubmit)="login()">
        <input [(ngModel)]="email" name="email" placeholder="Email" required>
        <input [(ngModel)]="password" name="password" type="password" placeholder="Passwort" required>
        <button class="btn fullBtn" type="submit">Login</button>
        <div *ngIf="error" class="error">{{error}}</div>
      </form>
      <a (click)="goToRegister($event)" class="register-link">Noch kein Konto? Registrieren.</a>
    </div>
  `,
   styleUrls: [
    './auth-form.shared.scss',
    '../add-note-dialog/add-note-dialog.component.scss'
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  constructor(private auth: AuthService, private router: Router) {}
  async login() {
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/']);
    } catch (e: any) {
     if (!this.email || !this.password) {
      this.error = 'Bitte geben Sie Ihre E-Mail und Passwort ein.';
    } else {
      this.error = e.message;
    }
  }
}

  goToRegister(event: Event) {
    event.preventDefault();
    debugger;
    this.router.navigate(['/register']);
  }
}

