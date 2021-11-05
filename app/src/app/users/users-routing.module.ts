import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { HomeComponent } from './home/home.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { DetailedWebinarComponent } from './detailed-webinar/detailed-webinar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: UsersComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'webinars-list', component: WebinarsListComponent },
    { path: 'webinar-detail', component: DetailedWebinarComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'cart', component: CartComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
