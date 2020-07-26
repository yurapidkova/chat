import {Injectable} from '@angular/core';
import {MessagesService} from './messages.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {MessageModel} from './chat/message/message.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly wsRelativeUrl = '/api/v1/ws/chat/all';
  private readonly authorizeRelativeUrl = '/api/v1/ws/auth';
  private wsConnection: WebSocket;

  constructor(private messagesService: MessagesService,
              private httpClient: HttpClient,
              private userService: UserService
  ) {
    this.authorize();
  }

  public authorize(): void {
    const wsUrl = `${window.location.protocol}//${window.location.hostname}:8080${this.authorizeRelativeUrl}`;
    this.httpClient.post(wsUrl, {name: this.userService.username})
      .subscribe((resp: { token: string }) => this.connect(resp.token));
  }

  public connect(token: string): void {
    const wsUrl = `ws://${window.location.hostname}:8080${this.wsRelativeUrl}?token=${token}&username=${this.userService.username}`;
    this.wsConnection = new WebSocket(wsUrl);
    const mess = new MessageModel('I\'m idiot', this.userService.username, Date.now());
    this.wsConnection.onopen = () => this.wsConnection.send(JSON.stringify(mess));
    this.wsConnection.onmessage = this.handleWebSocketMessage;
  }

  private handleWebSocketMessage = (event: MessageEvent) => {
    const message = MessageModel.parse(event.data);
    this.messagesService.newMessageReceived.next(message);
  }

}
