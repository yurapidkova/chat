import {Injectable} from '@angular/core';
import {MessageModel} from './chat/message/message.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _messages: MessageModel[] = [];

  newMessageReceived = new Subject<MessageModel>();

  constructor() {
    // this._messages = [
    //   new MessageModel('fdjhgjdf', 'slkghkfdg', Date.now()),
    //   new MessageModel('fdjhgjdf', 'slkghkfdg', Date.now()),
    //   new MessageModel('fdjhgjdf', 'slkghkfdg', Date.now()),
    // ];
  }

  public addMessage(message: MessageModel): void {
    this._messages.push(message);
    this.newMessageReceived.next(message);
  }

  get messages(): MessageModel[] {
    return this._messages.slice();
  }

}
