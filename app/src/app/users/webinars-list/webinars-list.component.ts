import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-webinars-list',
  templateUrl: './webinars-list.component.html',
  styleUrls: ['./webinars-list.component.scss']
})
export class WebinarsListComponent implements OnInit {

  webinars: any = [];
  webinarPriceType: string = '';

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(value => {
      console.log(value.get('type'));
      const webinarType = value.get('type') || '';
      this.getUpcomingWebinars(webinarType);
    })
    
    console.log('called');
  }

  getUpcomingWebinars(type: string) {
    const params = `webinarType/${type}`;
    this.usersService.getWebinars(params).subscribe((response: any) => {
      console.log(response);
      this.webinars = response;
      this.webinarPriceType = type === 'ondemand' ? 'recOneAttendeePrice': 'liveOneAttendeePrice';
    }, error => {
      console.log(error);
    })
  }

  viewDetails(webinar: any) {
    this.router.navigate(['/users/webinar-detail'], {queryParams: {title: webinar.title, id: webinar.id}})
  }

}
