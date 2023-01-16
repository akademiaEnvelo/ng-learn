import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from './message.type';

@Injectable()
export class ChatState {
  private http = inject(HttpClient);
  private messages$$ = new BehaviorSubject<Message[]>([]);

  constructor() {
    this.fetchMessages();
  }

  get messages$() {
    return this.messages$$.asObservable();
  }

  addMessage(message: Message) {
    this.messages$$.next([...this.messages$$.value, message]);
  }

  private fetchMessages() {
    this.http
      .get<Message[]>('http://localhost:3000/messages')
      .subscribe((messages) => {
        this.messages$$.next(messages);
      });
  }
}
