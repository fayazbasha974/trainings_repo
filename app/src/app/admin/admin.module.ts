import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { WebinarsListComponent } from './webinars-list/webinars-list.component';
import { CreateWebinarComponent } from './create-webinar/create-webinar.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    AdminHomeComponent,
    WebinarsListComponent,
    CreateWebinarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class AdminModule { }
