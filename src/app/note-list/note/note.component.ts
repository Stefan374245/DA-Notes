
import { Component, Input, inject } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { collection, doc, updateDoc, setDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { NoteListService } from '../../firebase-services/note-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Input() note!:Note;
  edit = false;
  hovered = false;
  firestore = inject(Firestore);

  constructor(private noteService: NoteListService){}

  async changeMarkedStatus() {
    if (!this.note.id) return;
    const noteRef = doc(collection(this.firestore, 'notes'), this.note.id);
    await updateDoc(noteRef, { marked: !this.note.marked });
    this.note.marked = !this.note.marked;
  }

  deleteHovered(){
    if(!this.edit){
      this.hovered = false;
    }
  }

  openEdit(){
    this.edit = true;
  }

  closeEdit(){
    this.edit = false;
    this.saveNote();
  }

  async moveToTrash() {
    if (!this.note.id) return;
    const trashRef = doc(collection(this.firestore, 'trash'), this.note.id);
    await setDoc(trashRef, { ...this.note, type: 'trash' });
    const noteRef = doc(collection(this.firestore, 'notes'), this.note.id);
    await deleteDoc(noteRef);
  }

  async moveToNotes() {
    if (!this.note.id) return;
    const noteRef = doc(collection(this.firestore, 'notes'), this.note.id);
    await setDoc(noteRef, { ...this.note, type: 'note' });
    const trashRef = doc(collection(this.firestore, 'trash'), this.note.id);
    await deleteDoc(trashRef);
  }

  async deleteNote() {
    if (!this.note.id) return;
    const trashRef = doc(collection(this.firestore, 'trash'), this.note.id);
    await deleteDoc(trashRef);
  }

  async saveNote() {
    if (!this.note.id) return;
    const noteRef = doc(collection(this.firestore, 'notes'), this.note.id);
    await updateDoc(noteRef, { title: this.note.title, content: this.note.content });
  }
}
