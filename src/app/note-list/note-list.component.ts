import { Component, OnDestroy } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteListService } from '../firebase-services/note-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NoteComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnDestroy {
  noteList: Note[] = [];
  favFilter: "all" | "fav" = "all";
  status: "notes" | "trash" = "notes";
  private notesSub!: Subscription;
  private trashSub!: Subscription;

  constructor(public noteService: NoteListService) {
    this.subscribeToNotes();
  }

  subscribeToNotes() {
    if (this.trashSub) {
      this.trashSub.unsubscribe();
    }
    this.notesSub = this.noteService.notes$.subscribe(notes => {
      this.noteList = notes;
    });
  }

  subscribeToTrash() {
    if (this.notesSub) {
      this.notesSub.unsubscribe();
    }
    this.trashSub = this.noteService.trash$.subscribe(trash => {
      this.noteList = trash;
    });
  }

  get filteredNotes(): Note[] {
    let list = this.noteList;
    if (this.status !== 'trash' && this.favFilter === 'fav') {
      list = list.filter(n => n.marked);
    }
    return list;
  }

  changeFavFilter(filter: "all" | "fav") {
    this.favFilter = filter;
  }

  changeTrashStatus() {
    if (this.status == "trash") {
      this.status = "notes";
      this.subscribeToNotes();
    } else {
      this.status = "trash";
      this.favFilter = "all";
      this.subscribeToTrash();
    }
  }

  ngOnDestroy() {
    if (this.notesSub) this.notesSub.unsubscribe();
    if (this.trashSub) this.trashSub.unsubscribe();
  }
}
