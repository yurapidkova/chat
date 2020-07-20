import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { MessageTimePipe } from './message-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    ChatComponent,
    MessageComponent,
    MessageTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
