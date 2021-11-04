import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-detailed-webinar',
  templateUrl: './detailed-webinar.component.html',
  styleUrls: ['./detailed-webinar.component.scss']
})
export class DetailedWebinarComponent implements OnInit {

  webinar: any = {};
  id: string = '';

  constructor(private readonly activeRoute: ActivatedRoute,
    private readonly usersService: UsersService) { }

  ngOnInit(): void {
    // console.log(this.activeRoute.snapshot.queryParams);
    this.id = this.activeRoute.snapshot.queryParams!.id;
    this.getWebinarDetails();
  }

  getWebinarDetails() {
    if (this.id) {
      const params = `id/${this.id}`;
      this.usersService.getWebinars(params).subscribe(response => {
        console.log(response);
        this.webinar = response[0];
      }, error => {
        console.log(error);
      })
    }
  }

  addToCart() {
    const payload = {
      paymentFor: 'recOneAttendeePrice'
    };
    this.usersService.addToCart(this.id, payload).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
