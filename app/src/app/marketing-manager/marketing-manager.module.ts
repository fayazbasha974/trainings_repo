import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { MarketingManagerRoutingModule } from './marketing-manager-routing.module';
import { MarketingManagerComponent } from './marketing-manager.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { MmHomeComponent } from './mm-home/mm-home.component';
import { MmOrdersComponent } from './mm-orders/mm-orders.component';


@NgModule({
  declarations: [
    MarketingManagerComponent,
    LoginComponent,
    ReportComponent,
    MmHomeComponent,
    MmOrdersComponent
  ],
  imports: [
    CommonModule,
    MarketingManagerRoutingModule,
    ClarityModule
  ]
})
export class MarketingManagerModule { }
