import { Component, OnInit } from '@angular/core';
import { MarketingManagerService } from '../services/marketing-manager.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  title: string = 'Orders Report';
  items: any = [];
  constructor(private readonly mmService: MarketingManagerService) { }

  ngOnInit(): void {
    this.mmService.getOrders().subscribe(response => {
      console.log(response);
      this.items = response.Items;
    }, error => {
      console.log(error);
    })
  }

}
