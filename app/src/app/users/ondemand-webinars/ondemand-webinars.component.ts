import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-ondemand-webinars',
  templateUrl: './ondemand-webinars.component.html',
  styleUrls: ['./ondemand-webinars.component.scss']
})
export class OndemandWebinarsComponent implements OnInit {
  webinars: any = [];

  constructor(private readonly usersService: UsersService, private readonly router: Router) { }

  ngOnInit(): void {
    this.getUpcomingWebinars();
  }

  getUpcomingWebinars() {
    const params = 'webinarType/ondemand';
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

  ngAfterViewChecked(): void {
    $('.your-partners-slider-list').owlCarousel({
      stagePadding: 20,
      loop: false,
      margin: 20,
      responsiveClass: true,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: false,
      autoplaySpeed: 2000,
      fluidSpeed: false,
      responsive: {
        0: {
          stagePadding: 20,
          margin: 10,
          items: 1,
          nav: false,
          loop: false,
          dots: true
        },
        600: {
          stagePadding: 20,
          items: 1,
          nav: false,
          loop: false,
          dots: true
        },
        768: {
          stagePadding: 20,
          items: 1,
          nav: false,
          loop: false,
          dots: false
        },
        1000: {
          items: 1,
          nav: false,
          loop: false,
          dots: false
        },
        1280: {
          items: 2,
          nav: false,
          loop: false,
          dots: false
        }
      }
    })
  }
}
