import { Injectable, inject } from '@angular/core';
import { collection, Firestore, doc, onSnapshot} from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  firestore = inject(Firestore);

  notes$ = new BehaviorSubject<Note[]>([]);
  trash$ = new BehaviorSubject<Note[]>([]);
  unsubscribeNotes: () => void;
  unsubscribeTrash: () => void;

  constructor() {
    this.unsubscribeNotes = onSnapshot(this.getNotesRef(), (snapshot) => {
      const notes: Note[] = [];
      snapshot.forEach(doc => notes.push({ ...doc.data(), id: doc.id } as Note));
      this.notes$.next(notes);
    });
    this.unsubscribeTrash = onSnapshot(this.getTrashRef(), (snapshot) => {
      const trash: Note[] = [];
      snapshot.forEach(doc => trash.push({ ...doc.data(), id: doc.id } as Note));
      this.trash$.next(trash);
    });
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


  ngOnDestroy() {
    if (this.unsubscribeNotes) {
      this.unsubscribeNotes();
    }
    if (this.unsubscribeTrash) {
      this.unsubscribeTrash();
    }
  }
}
