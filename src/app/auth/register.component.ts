import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="app-login">
    <form (ngSubmit)="register()">
      <input [(ngModel)]="email" name="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Passwort" required>
      <button class="btn fullBtn" type="submit">Registrieren</button>
      <div *ngIf="error" style="color:red">{{error}}</div>
    </form>
    <a (click)="goToLogin($event)" class="register-link">Schon registriert? <br> Zurück zum Login.</a>
  </div>
  `,
    styleUrls: [
    './auth-form.shared.scss',
    '../add-note-dialog/add-note-dialog.component.scss'
  ]
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
  constructor(private auth: AuthService, private router: Router) {}
  async register() {
    try {
      await this.auth.register(this.email, this.password);
      this.router.navigate(['/']);
    } catch (e: any) {
    if (!this.email || !this.password) {
      this.error = 'Bitte geben Sie Ihre E-Mail und Passwort ein.';
    } else {
      this.error = e.message;
    }
    }
  }
  goToLogin(event: Event) {
    event.preventDefault();
    debugger;
    this.router.navigate(['/login']);
  }
}
