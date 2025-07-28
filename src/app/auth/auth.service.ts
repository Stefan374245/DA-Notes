import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, deleteUser } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, user => this.user$.next(user));
  }

  async register(email: string, password: string) {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      this.user$.next(cred.user);
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        throw new Error('Sie haben sich bereits registriert.');
      }
      throw e;
    }
  }

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    this.user$.next(cred.user);
  }

  async logout() {
    await signOut(this.auth);
    this.user$.next(null);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

    async deleteAccount() {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Kein Benutzer angemeldet.');
    await deleteUser(user);
    this.user$.next(null);
    }
}
