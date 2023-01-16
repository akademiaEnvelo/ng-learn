import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket = inject(Socket);

  emit<T extends object>(event: string, payload: T) {
    this.socket.emit(event, { ...payload });
  }

  subscribe<T>(event: string) {
    return this.socket.fromEvent<T>(event);
  }
}
