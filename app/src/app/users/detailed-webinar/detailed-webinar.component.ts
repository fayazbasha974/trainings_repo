import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detailed-webinar',
  templateUrl: './detailed-webinar.component.html',
  styleUrls: ['./detailed-webinar.component.scss']
})
export class DetailedWebinarComponent implements OnInit {

  webinar: any = {};
  id: string = '';
  showError: boolean = false;
  webinarForm!: FormGroup;
  constructor(private readonly activeRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly fb: FormBuilder) { 
    }

  ngOnInit(): void {
    // console.log(this.activeRoute.snapshot.queryParams);
    this.initForm();
    this.id = this.activeRoute.snapshot.queryParams!.id;
    this.getWebinarDetails();
  }

  initForm() {
    this.webinarForm = this.fb.group({
      paymentFor: []
    });
  }

  getWebinarDetails() {
    if (this.id) {
      const params = `id/${this.id}`;
      this.usersService.getWebinars(params).subscribe(response => {
        console.log(response);
        this.webinar = response[0];
        const paymentFor = this.webinar.webinarType === 'upcoming' ? 'liveOneAttendeePrice' : 'recOneAttendeePrice';
        this.webinarForm.get('paymentFor')!.patchValue(paymentFor);
      }, error => {
        console.log(error);
      })
    }
  }

  addToCart() {
    if (localStorage.getItem('token')) {
      // const payload = {
      //   paymentFor: 'recOneAttendeePrice'
      // };
      const payload = this.webinarForm.value;
      this.usersService.addToCart(this.id, payload).subscribe(response => {
        console.log(response);
        this.usersService.addedToCart.next(1);
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
