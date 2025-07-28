import { Injectable, inject } from '@angular/core';
import { collection, Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';
import { BehaviorSubject } from 'rxjs';
import { setDoc, deleteDoc, updateDoc, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  firestore = inject(Firestore);
  authService = inject(AuthService);

  notes$ = new BehaviorSubject<Note[]>([]);
  trash$ = new BehaviorSubject<Note[]>([]);
  unsubscribeNotes: () => void = () => {};
  unsubscribeTrash: () => void = () => {};

  constructor() {
   
    this.authService.user$.subscribe(user => {
      if (this.unsubscribeNotes) this.unsubscribeNotes();
      if (this.unsubscribeTrash) this.unsubscribeTrash();
      if (!user) {
        this.notes$.next([]);
        this.trash$.next([]);
        return;
      }
      const notesQuery = query(this.getNotesRef(), where('uid', '==', user.uid));
      this.unsubscribeNotes = onSnapshot(notesQuery, (snapshot) => {
        const notes: Note[] = [];
        snapshot.forEach(doc => notes.push({ ...doc.data(), id: doc.id } as Note));
        this.notes$.next(notes);
      });
      const trashQuery = query(this.getTrashRef(), where('uid', '==', user.uid));
      this.unsubscribeTrash = onSnapshot(trashQuery, (snapshot) => {
        const trash: Note[] = [];
        snapshot.forEach(doc => trash.push({ ...doc.data(), id: doc.id } as Note));
        this.trash$.next(trash);
      });
    });
  }

  async addNote(note: Note) {
    const user = this.authService.currentUser;
    if (!user) throw new Error('Nicht eingeloggt');
    const docRef = await addDoc(this.getNotesRef(), { ...note, uid: user.uid });
    return docRef;
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getSingleDocRef(collectionId: string, documentId: string) {
    return doc(collection(this.firestore, collectionId), documentId);
  }

  async moveToTrash(note: Note) {
    if (!note.id) return;
    const trashRef = this.getSingleDocRef('trash', note.id);
    await setDoc(trashRef, { ...note, type: 'trash' });
    const noteRef = this.getSingleDocRef('notes', note.id);
    await deleteDoc(noteRef);
  }

  async moveToNotes(note: Note) {
    if (!note.id) return;
    const noteRef = this.getSingleDocRef('notes', note.id);
    await setDoc(noteRef, { ...note, type: 'note' });
    const trashRef = this.getSingleDocRef('trash', note.id);
    await deleteDoc(trashRef);
  }

  async deleteNote(note: Note) {
    if (!note.id) return;
    const trashRef = this.getSingleDocRef('trash', note.id);
    await deleteDoc(trashRef);
  }

  async saveNote(note: Note) {
    if (!note.id) return;
    const noteRef = this.getSingleDocRef('notes', note.id);
    await updateDoc(noteRef, { title: note.title, content: note.content });
  }

  async changeMarkedStatus(note: Note) {
    if (!note.id) return;
    const noteRef = this.getSingleDocRef('notes', note.id);
    await updateDoc(noteRef, { marked: !note.marked });
  }

  // Beispiel für eine Query: Alle markierten Notizen
  async getMarkedNotes() {
    const notesRef = this.getNotesRef();
    const q = query(notesRef, where('marked', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Note);
  }


  ngOnDestroy() {
    if (this.unsubscribeNotes) {
      this.unsubscribeNotes();
    }
    if (this.unsubscribeTrash) {
      this.unsubscribeTrash();
    }
  }
}
