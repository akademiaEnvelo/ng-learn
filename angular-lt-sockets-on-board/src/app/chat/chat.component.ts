import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChatInputComponent } from './chat-input.component';
import { ChatMessagesComponent } from './chat-messages.component';
import { ChatService } from './chat.service';
import { ChatState } from './chat.state.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  template: `
    <p>Użytkownik: {{ userId }}</p>
    <app-chat-input (send)="send($event)"/>
    <app-chat-messages *ngIf="messages$ | async as messages" [messages]="messages" [userId]="userId" />
  `,
  styles: [
    `
      .my-msg {
        font-weight: 800;
      }
    `,
  ],
  imports: [ChatMessagesComponent, ChatInputComponent, AsyncPipe, NgIf],
  providers: [ChatState, ChatService],
})
export class ChatComponent {
  private chatService = inject(ChatService);

  messages$ = inject(ChatState).messages$;
  userId = prompt('Nazwa użytkownika', 'user') || 'user';

  ngOnInit() {
    this.chatService.handleIncomingMessages();
  }

  send(message: string) {
    this.chatService.emitMesage({
      message,
      uuid: this.userId,
    });
  }
}

export default ChatComponent;
