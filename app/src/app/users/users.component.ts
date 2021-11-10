import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  userConfig: any = {
    showLoginPopup: false,
    data: {}
  };

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getUserDetails();
    }
  }

  getUserDetails() {
    this.usersService.getTokenDetails().subscribe(response => {
      console.log(response);
      this.userConfig.data = response;
    }, error => {
      console.log(error);
    });
  }

}
