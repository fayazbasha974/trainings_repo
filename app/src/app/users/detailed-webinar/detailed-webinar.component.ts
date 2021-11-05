import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-detailed-webinar',
  templateUrl: './detailed-webinar.component.html',
  styleUrls: ['./detailed-webinar.component.scss']
})
export class DetailedWebinarComponent implements OnInit {

  webinar: any = {};
  id: string = '';
  showError: boolean = false;
  constructor(private readonly activeRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly router: Router) { }

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
    if (localStorage.getItem('token')) {
      const payload = {
        paymentFor: 'recOneAttendeePrice'
      };
      this.usersService.addToCart(this.id, payload).subscribe(response => {
        console.log(response);
        this.router.navigate(['/users/cart']);
      }, error => {
        console.log(error);
      });
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }
  }

}
