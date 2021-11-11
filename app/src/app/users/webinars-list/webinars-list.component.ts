import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-webinars-list',
  templateUrl: './webinars-list.component.html',
  styleUrls: ['./webinars-list.component.scss']
})
export class WebinarsListComponent implements OnInit {

  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(value => {
      console.log(value);
    })
    console.log('called');
  }

}
