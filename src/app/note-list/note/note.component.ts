
import { Component, Input, inject } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
// ...existing code...
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
  // firestore = inject(Firestore); // nicht mehr benötigt

  constructor(public noteService: NoteListService){}

  async changeMarkedStatus() {
    await this.noteService.changeMarkedStatus(this.note);
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
    await this.noteService.moveToTrash(this.note);
  }

  async moveToNotes() {
    await this.noteService.moveToNotes(this.note);
  }

  async deleteNote() {
    await this.noteService.deleteNote(this.note);
  }

  async saveNote() {
    await this.noteService.saveNote(this.note);
  }
}
