import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { MarketingManagerRoutingModule } from './marketing-manager-routing.module';
import { MarketingManagerComponent } from './marketing-manager.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { MmHomeComponent } from './mm-home/mm-home.component';
import { MmOrdersComponent } from './mm-orders/mm-orders.component';
import { MmSideNavComponent } from './mm-side-nav/mm-side-nav.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MarketingManagerComponent,
    LoginComponent,
    ReportComponent,
    MmHomeComponent,
    MmOrdersComponent,
    MmSideNavComponent
  ],
  imports: [
    CommonModule,
    MarketingManagerRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ]
})
export class MarketingManagerModule { }
