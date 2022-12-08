import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

export interface SongFormValue {
  title: string;
  album: string;
  duration: string;
  artist: string;
}

@Component({
  selector: 'app-add-song-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section>
      Dodaj pieśń
      <form [formGroup]="createSongForm" (ngSubmit)="onAddSong()">
        <input formControlName="artist" placeholder="artysta" />
        <input formControlName="title" placeholder="tytuł" />
        <input formControlName="album" placeholder="album" />
        <div>
          <span>czas trwania: </span
          ><input formControlName="duration" type="time" />
        </div>
        <button>Dodaj</button>
      </form>
    </section>
  `,
  styles: [],
})
export class AddSongFormComponent {
  @Output() addSong = new EventEmitter<SongFormValue>();

  builder = inject(NonNullableFormBuilder);

  createSongForm = this.builder.group({
    title: this.builder.control(''),
    artist: this.builder.control(''),
    duration: this.builder.control(''),
    album: this.builder.control(''),
  });

  onAddSong() {
    this.createSongForm.markAllAsTouched();

    if (this.createSongForm.invalid) {
      return;
    }

    /// yupi
    this.addSong.emit(this.createSongForm.getRawValue());
  }
}
