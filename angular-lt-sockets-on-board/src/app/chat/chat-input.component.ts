import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chat-input',
  imports: [ReactiveFormsModule],
  template: `
    <button (click)="emitSend()">emit</button>
    <input [formControl]="messageControl" (keyup.enter)="emitSend()" />
  `,
})
export class ChatInputComponent {
  @Output() send = new EventEmitter<string>();

  messageControl = new FormControl('');

  emitSend() {
    const trimmedMsg = this.messageControl.value?.trim();
    if (!trimmedMsg) {
      return;
    }

    this.send.emit(trimmedMsg);
    this.messageControl.reset();
  }
}
