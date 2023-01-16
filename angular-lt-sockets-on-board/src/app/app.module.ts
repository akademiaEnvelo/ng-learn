import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

const config: SocketIoConfig = {
  url: 'http://localhost:5000', // socket server url
  options: {
    transports: ['websocket'],
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: '',
            loadComponent: () => import('./chat/chat.component'),
          },
        ],
      },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
