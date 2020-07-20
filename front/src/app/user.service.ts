import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _username: string;

  constructor() {
    this._username = UserService.makeId(9);
  }

  private static makeId(length): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  get username(): string {
    return this._username;
  }
}
