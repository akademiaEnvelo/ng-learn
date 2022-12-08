import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

export interface Song {
  id: string;
  artist: string;
  title: string;
  album: string;
  favorite: boolean;
  createdAt: string;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  songs$$ = new BehaviorSubject<Song[]>([]);

  constructor() {
    // http mock;
    of<Song[]>([
      {
        id: '60713b2d-d5ae-41ec-b7d9-102371677512',
        artist: 'Hewe Jacquet',
        title: 'Violet Butterwort',
        album: 'Roth',
        favorite: true,
        createdAt: '1668789169000',
        duration: 196,
      },
      {
        id: 'a24e1b49-f316-4080-bdc9-cb1adedc84f7',
        artist: 'Sadie Swainston',
        title: 'Arthothelium Lichen',
        album: 'Mccormick',
        favorite: false,
        createdAt: '1658482101000',
        duration: 206,
      },
      {
        id: 'f771a21c-3050-4dbe-9338-d4b6583438b5',
        artist: 'Gussi Desesquelle',
        title: 'Western Daisy Fleabane',
        album: 'Cottonwood',
        favorite: true,
        createdAt: '1642574005000',
        duration: 199,
      },
      {
        id: 'f6574371-c489-43ca-ad5e-b3df60eee126',
        artist: 'Zilvia Belf',
        title: 'Rock Harlequin',
        album: 'Clemons',
        favorite: true,
        createdAt: '1638980502000',
        duration: 225,
      },
      {
        id: 'c3300044-7e13-42f9-8650-a4913b589699',
        artist: 'Bev Hellwing',
        title: 'Cutleaf Daisy',
        album: 'Pearson',
        favorite: false,
        createdAt: '1667271739000',
        duration: 239,
      },
      {
        id: 'a409f38f-90d7-4285-a2c6-f7261d983637',
        artist: 'Eliot Eslinger',
        title: 'Dot Lichen',
        album: 'Summer Ridge',
        favorite: false,
        createdAt: '1651865329000',
        duration: 224,
      },
      {
        id: 'd8a0a9fd-2b6b-4ff7-b1b6-fb9b797d50e0',
        artist: 'Robbie Trew',
        title: 'Hairy Hedgenettle',
        album: 'Knutson',
        favorite: false,
        createdAt: '1665227724000',
        duration: 234,
      },
      {
        id: '88f827c5-9f99-4ff6-9850-8a6560c96fe3',
        artist: 'Maggie Arsnell',
        title: 'Hesperochiron',
        album: 'Grim',
        favorite: true,
        createdAt: '1667714775000',
        duration: 207,
      },
      {
        id: 'dbe94e17-47c7-4ba1-a4f3-c86ea60e8c39',
        artist: 'Arron Rubie',
        title: 'Broadleaf Peppermint Gum',
        album: 'Golf View',
        favorite: true,
        createdAt: '1657282949000',
        duration: 216,
      },
      {
        id: '8150a976-f0d9-45b1-8fe7-63051f9858bd',
        artist: 'Cathrine Briand',
        title: 'Seringe Willow',
        album: 'South',
        favorite: false,
        createdAt: '1647323161000',
        duration: 188,
      },
    ]).subscribe((songs) => {
      this.songs$$.next(songs);
    });
  }
}
