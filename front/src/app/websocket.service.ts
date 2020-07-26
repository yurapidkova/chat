import {Injectable} from '@angular/core';
import {MessagesService} from './messages.service';
import {HttpClient} from '@angular/common/http';
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
  ) {
  }

  public sendMessage(message: MessageModel): void {
    this.wsConnection.send(JSON.stringify(message));
  }

  private authorize(username: string): void {
    const wsUrl = `${window.location.protocol}//${window.location.hostname}:8080${this.authorizeRelativeUrl}`;
    this.httpClient.post(wsUrl, {name: username})
      .subscribe((resp: { token: string }) => this.connect(resp.token, username));
  }

  private connect(token: string, username: string): void {
    const wsUrl = `ws://${window.location.hostname}:8080${this.wsRelativeUrl}?token=${token}&username=${username}`;
    this.wsConnection = new WebSocket(wsUrl);
    this.wsConnection.onmessage = this.handleWebSocketMessage;
  }

  public handleUserChanged(username: string): void {
    if (username !== '') {
      this.authorize(username);
    } else if (!username) {
      this.wsConnection.close();
    }
  }

  private handleWebSocketMessage = (event: MessageEvent) => {
    const message = MessageModel.parse(event.data);
    this.messagesService.addMessage(message);
  }

}
