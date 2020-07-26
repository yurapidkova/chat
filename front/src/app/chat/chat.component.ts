import {Component, OnDestroy, OnInit} from '@angular/core';

import {MessageModel} from './message/message.model';
import {MessagesService} from '../messages.service';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {WebsocketService} from '../websocket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  messages: MessageModel[];
  username: string;

  constructor(private messagesService: MessagesService,
              private websocketService: WebsocketService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.messages = this.messagesService.messages;
    this.username = this.userService.username;
    this.subscriptions.push(
      this.messagesService.newMessageReceived
        .subscribe(message => {
          this.messages.push(message);
        }),
      this.userService.userHasBeenChanged
        .subscribe(username => {
          this.username = username;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  public onAddMessage(messageElement: HTMLInputElement): void {
    const message = new MessageModel(messageElement.value, this.username, Date.now());
    this.websocketService.sendMessage(message);
    messageElement.value = '';
  }
}
