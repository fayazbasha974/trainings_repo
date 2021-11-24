import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon, employeeIcon, eventIcon, shareIcon, microphoneIcon,headphonesIcon,errorStandardIcon, trashIcon } from '@cds/core/icon';
ClarityIcons.addIcons(userIcon,clockIcon,alarmClockIcon,assignUserIcon,dollarIcon,employeeIcon,eventIcon,shareIcon,microphoneIcon,headphonesIcon,errorStandardIcon,trashIcon);


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  webinars: any = [];
  paymentOptions: any = {};
  totalPrice: number = 0;

  constructor(private readonly usersService: UsersService, private readonly router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.usersService.getCart().subscribe(response => {
      console.log(response);
      this.webinars = response.Items;
      this.paymentOptions = response.paymentOptions;
      this.getTotalAmount();
    }, error => {
      console.log(error);
    });
  }

  getTotalAmount() {
    this.webinars.map((webinar: any) => {
      this.totalPrice += Number(webinar[this.paymentOptions[webinar.id]]);
    });
  }

  payment() {
    this.router.navigate(['/users/payment']);
  }

}
