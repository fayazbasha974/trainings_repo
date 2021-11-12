import { Component, OnInit } from '@angular/core';
import { ClarityIcons, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-mm-home',
  templateUrl: './mm-home.component.html',
  styleUrls: ['./mm-home.component.scss']
})
export class MmHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
