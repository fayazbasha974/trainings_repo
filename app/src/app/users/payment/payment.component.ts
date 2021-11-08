import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { UsersService } from '../services/users.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card !: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService,
    private readonly usersService: UsersService, private readonly toaster: ToasterService,
    private readonly router: Router) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  pay(): void {
    const name = this.paymentForm.get('name')!.value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          const requestPayload = {
            amount: 50,
            token: result.token.id
          };
          this.usersService.payment(requestPayload).subscribe(response => {
            console.log(response);
            this.toaster.success(response.message);
            this.router.navigate(['/users']);
          }, error => {
            this.toaster.error(error.message);
            console.log(error);
          });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
