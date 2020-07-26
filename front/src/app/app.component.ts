import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Subscription} from 'rxjs';
import {WebsocketService} from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  userExist: boolean;
  private userChangedSubscription: Subscription;

  constructor(private userService: UserService,
              private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.userChangedSubscription = this.userService.userHasBeenChanged
      .subscribe(username => {
        this.userExist = !!username;
        this.websocketService.handleUserChanged(username);
      });
  }

  ngOnDestroy(): void {
    this.userChangedSubscription.unsubscribe();
  }
}
