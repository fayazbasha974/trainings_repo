import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userConfig: any;

  constructor() { }

  ngOnInit(): void {
  }

  showLogin(): void {
    this.userConfig.showLoginPopup = true;
  }

}
