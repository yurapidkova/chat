export class MessageModel {

  constructor(private _content: string,
              private _user: string,
              private _time: number
  ) {
  }

  public static parse(data: string): MessageModel {
    const json = JSON.parse(data);
    return new MessageModel(json.content, json.username, json.time);
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

  public toJSON() {
    return {
      content: this._content,
      time: this._time,
      username: this._user
    };
  }
}
