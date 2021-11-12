import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketingManagerService } from '../services/marketing-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly service: MarketingManagerService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(response => {
        console.log(response);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.data.username);
        this.router.navigate(['/marketing-manager/home']);
      }, error => {
        console.log(error);
      });
    }
  }

}
