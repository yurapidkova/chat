import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userHasBeenChanged = new Subject<string>();
  private _username: string;

  constructor() {
    // this.username = UserService.makeId(9);
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
    this.userHasBeenChanged.next(username);
  }
}
