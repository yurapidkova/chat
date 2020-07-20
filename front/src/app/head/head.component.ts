import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.less']
})
export class HeadComponent implements OnInit {

  username: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.username = this.userService.username;
  }


}
