import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { MusicService, Song } from './music.service';
import { AddSongFormComponent, SongFormValue } from './add-song-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddSongFormComponent],
  templateUrl: './app.component.html',
  styles: [
    `
      main {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      @media (width > 500px) {
        main {
          flex-direction: row;
        }
      }

      section {
        width: fit-content;
      }

      input {
        display: block;
        margin-inline-start: auto;
      }

      em {
        font-style: italic;
      }

      td {
        vertical-align: text-top;
      }

      button {
        background-color: unset;
        border: unset;
        cursor: pointer;
      }

      td:last-child {
        padding-inline-start: 15px;
      }

      td:last-child button {
        background-color: royalblue;
        color: white;
        padding: 4px 8px;
        border-radius: 10px;
      }

      input {
        margin-block-end: 10px;
      }

      input + div {
        display: flex;
        justify-content: space-between;
      }

      input + div + button {
        margin: auto;
        display: block;
        width: fit-content;

        background-color: royalblue;
        color: white;
        padding: 4px 8px;
        border-radius: 10px;
      }
    `,
  ],
})
export class AppComponent {
  // "fake" constructor goes first
  private musicService = inject(MusicService);
  private builder = inject(NonNullableFormBuilder);

  // example for async pipe
  data$ = this.musicService.getData().pipe(
    tap(() => {
      console.log('side effects!!!');
    })
  );

  searchControl = this.builder.control('');
  songs: Song[] = [];

  createSongForm = this.builder.group({
    title: this.builder.control(''),
    artist: this.builder.control(''),
    duration: this.builder.control(''),
    album: this.builder.control(''),
  });

  private songsRaw: Song[] = [];
  private subscriptions = new Subscription();

  ngOnInit() {
    this.getSongs();
    this.handleSearchInputChange();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleFav(song: Song) {
    song.favorite = !song.favorite;
  }

  duration(duration: number) {
    const minutes = duration % 60;

    return (
      Math.floor(duration / 60) + ':' + (minutes > 10 ? minutes : `0${minutes}`)
    );
  }

  addSong(songFormValue: SongFormValue) {
    this.musicService.addSong(songFormValue);
  }

  private getSongs() {
    const sub = this.musicService.songs$.subscribe((songs) => {
      this.songsRaw = songs;
      this.songs = songs;
    });

    this.subscriptions.add(sub);
  }

  private handleSearchInputChange() {
    const sub = this.searchControl.valueChanges
      .pipe(
        debounceTime(350),
        map((value) => value.trim().toLowerCase()),
        tap((value) => {
          if (!value) {
            this.songs = [...this.songsRaw];
          }
        }),
        filter(Boolean)
      )
      .subscribe((searchPhrase) => {
        this.songs = this.songsRaw.filter((song) =>
          Object.values(song)
            .filter(
              (value) => typeof value === 'string' || typeof value === 'number'
            )
            .some((value: string | number) =>
              value.toString().toLowerCase().includes(searchPhrase)
            )
        );
      });

    this.subscriptions.add(sub);
  }
}
