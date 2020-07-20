import { Component, OnInit } from '@angular/core';
import {MessageModel} from './message/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  messages: MessageModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
