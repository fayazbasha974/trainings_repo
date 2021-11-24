import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon } from '@cds/core/icon';

import { Router } from '@angular/router';
ClarityIcons.addIcons(userIcon,clockIcon,alarmClockIcon,assignUserIcon,dollarIcon);

@Component({
  selector: 'app-upcoming-webinars',
  templateUrl: './upcoming-webinars.component.html',
  styleUrls: ['./upcoming-webinars.component.scss']
})
export class UpcomingWebinarsComponent implements OnInit {

  webinars: any = [];

  constructor(private readonly usersService: UsersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getUpcomingWebinars();
  }

  getUpcomingWebinars() {
    const params = 'webinarType/upcoming';
    this.usersService.getWebinars(params).subscribe(response => {
      console.log(response);
      this.webinars = response;
    }, error => {
      console.log(error);
    })
  }

  viewDetails(webinar: any) {
    this.router.navigate(['/users/webinar-detail'], {queryParams: {title: webinar.title, id: webinar.id}})
  }

}
