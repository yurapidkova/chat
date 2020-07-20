export class MessageModel {

  constructor(private _content: string,
              private _user: string,
              private _time: number
  ) {
  }

  get content(): string {
    return this._content;
  }

  get user(): string {
    return this._user;
  }

  get time(): number {
    return this._time;
  }
}
