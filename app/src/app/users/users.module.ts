import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CartComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
