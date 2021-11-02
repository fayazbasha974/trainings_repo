import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateWebinarComponent } from './create-webinar/create-webinar.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'home', component: AdminHomeComponent, canActivate: [AdminGuard], children: [
      { path: 'create-webinar', component: CreateWebinarComponent },
      { path: 'webinars-list', component: WebinarsListComponent}
    ] }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
