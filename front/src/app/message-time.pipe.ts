import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'messageTime'
})
export class MessageTimePipe implements PipeTransform {

  transform(value: number): unknown {
    const date = new Date(value);
    return `${date.getDay()} - ${date.getMonth() + 1} - ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

}
