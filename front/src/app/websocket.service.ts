import {Injectable} from '@angular/core';
import {MessagesService} from './messages.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly wsRelativeUrl = '/api/v1/ws/chat/all';
  private readonly authorizeRelativeUrl = '/api/v1/ws/auth';
  private wsConnection: WebSocket;

  constructor(private messagesService: MessagesService,
              private httpClient: HttpClient) {
    this.authorize('KURVA');
    // const wsUrl = `ws://${window.location.hostname}:8080${this.wsRelativeUrl}`;
    // this.connect(wsUrl);
  }

  public authorize(name: string): void {
    const wsUrl = `${window.location.protocol}//${window.location.hostname}:8080${this.authorizeRelativeUrl}`;
    this.httpClient.post(wsUrl, {name}).subscribe(console.log);
  }

  public connect(wsUrl: string): void {
    this.wsConnection = new WebSocket(wsUrl);
    this.wsConnection.onopen = () => this.wsConnection.send(JSON.stringify({data: 5}));
  }
}
