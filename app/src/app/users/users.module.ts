import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStripeModule } from 'ngx-stripe';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { LoginComponent } from './login/login.component';
import { DetailedWebinarComponent } from './detailed-webinar/detailed-webinar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UpcomingWebinarsComponent } from './upcoming-webinars/upcoming-webinars.component';
import { OndemandWebinarsComponent } from './ondemand-webinars/ondemand-webinars.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ClarityModule } from '@clr/angular';
import { MainFooterComponent } from './main-footer/main-footer.component';

@NgModule({
  declarations: [
    UsersComponent,
    HeaderComponent,
    HomeComponent,
    WebinarsListComponent,
    LoginComponent,
    DetailedWebinarComponent,
    AboutUsComponent,
    ContactUsComponent,
    UpcomingWebinarsComponent,
    OndemandWebinarsComponent,
    CartComponent,
    PaymentComponent,
    MainFooterComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    ClarityModule,
    NgxStripeModule.forRoot("pk_test_51JstDRSJaQiiuXPdWrb89ndhJE81tI0ZUATmNGqBnUr97hIFu0AuXiUpMoViLhIDjHODaJbXAJT73UuyF3yuqcxo0012oRK293")
  ]
})
export class UsersModule { }
