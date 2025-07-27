import { Injectable, inject } from '@angular/core';
import { collection, Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  firestore = inject(Firestore);

  notes$ = new BehaviorSubject<Note[]>([]);
  unsubscribeNotes: () => void;

  constructor() {
    this.unsubscribeNotes = onSnapshot(this.getNotesRef(), (snapshot) => {
      const notes: Note[] = [];
      snapshot.forEach(doc => notes.push({ ...doc.data(), id: doc.id } as Note));
      this.notes$.next(notes);
    });
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getSingleDocRef(collectionId: string, documentId: string) {
    return doc(collection(this.firestore, collectionId), documentId);
  }

  // Call this in ngOnDestroy to unsubscribe
  destroy() {
    if (this.unsubscribeNotes) {
      this.unsubscribeNotes();
    }
  }
}
// Die Daten werden jetzt per onSnapshot aktualisiert und können manuell unsubscribed werden.