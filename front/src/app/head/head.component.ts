import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.less']
})
export class HeadComponent implements OnInit, OnDestroy {

  username: string;
  private userChangedSubscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userChangedSubscription = this.userService.userHasBeenChanged
      .subscribe(username => this.username = username);
  }

  public onUsernameChanged(username: string): void {
    this.userService.username = username;
  }

  ngOnDestroy(): void {
    this.userChangedSubscription.unsubscribe();
  }
}
