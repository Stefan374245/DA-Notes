import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteListService } from '../firebase-services/note-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.scss'
})
export class AddNoteDialogComponent {
  @Output() addDialogClosed: EventEmitter<boolean> = new EventEmitter();
  title = "";
  description = "";


  notes$ = this.noteService.notes$;

  constructor(public noteService: NoteListService) {}

  closeDialog() {
    this.title = "";
    this.description = "";
    this.addDialogClosed.emit(false);
  }

  async addNote() {
    if (!this.title.trim() && !this.description.trim()) return;
    const note: Note = {
      title: this.title,
      content: this.description,
      marked: false,
      type: "note"
    };
    await this.noteService.addNote(note);
    this.closeDialog();
  }
}
