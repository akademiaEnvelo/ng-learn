import { inject, Injectable } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { SocketService } from '../core/socket.service';
import { ChatState } from './chat.state.service';
import { Message } from './message.type';

@Injectable()
export class ChatService {
  private socket = inject(SocketService);
  private chatState = inject(ChatState);

  private destroyToken$$ = new ReplaySubject<void>(1);

  emitMesage(message: Message) {
    this.socket.emit('msg', message);
  }

  handleIncomingMessages() {
    this.socket
      .subscribe<Message>('msg')
      .pipe(takeUntil(this.destroyToken$$))
      .subscribe((message) => {
        this.chatState.addMessage(message);
      });
  }

  ngOnDestroy() {
    this.destroyToken$$.next();
    this.destroyToken$$.complete();
  }
}
