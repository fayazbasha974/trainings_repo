import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketingManagerComponent } from './marketing-manager.component';
import { LoginComponent } from './login/login.component';
import { MmHomeComponent } from './mm-home/mm-home.component';
import { MmOrdersComponent } from './mm-orders/mm-orders.component';

const routes: Routes = [
  { path: '', component: MarketingManagerComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: MmHomeComponent, children: [
      { path: 'orders', component: MmOrdersComponent }, 
      { path: '**', redirectTo: 'orders' }
    ] }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingManagerRoutingModule { }
