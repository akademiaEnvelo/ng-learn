import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message } from './message.type';

@Component({
  standalone: true,
  imports: [NgFor],
  selector: 'app-chat-messages[messages][userId]',
  template: `
    <section>
      <ul>
        <li
          *ngFor="let value of messages"
          [class.my-msg]="value.uuid === userId"
        >
          {{ value.message }} | {{ value.uuid === userId ? 'Ty' : value.uuid }}
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      .my-msg {
        font-weight: 800;
      }
    `,
  ],
})
export class ChatMessagesComponent {
  @Input() messages: Message[] = [];
  @Input() userId!: string;
}
