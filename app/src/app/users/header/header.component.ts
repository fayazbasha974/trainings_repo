import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userConfig: any;

  constructor(private readonly usersService: UsersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.usersService.addedToCart.subscribe((value: any) => {
      this.userConfig.data!.cart += value;
    });
  }

  showLogin(): void {
    this.userConfig.showLoginPopup = true;
  }

  goToCart() {
    this.router.navigate(['/users/cart']);
  }

}
