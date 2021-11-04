import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { urls } from '../../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly apiService: ApiService) { }

  getWebinars(params?: string): Observable<any> {
    const url = `${urls.getWebinar}/${params}`;
    return this.apiService.get(url);
  }
  
  login(payload: any): Observable<any> {
    const url = `${urls.usersLogin}`;
    return this.apiService.post(url, payload);
  }

  signup(payload: any): Observable<any> {
    const url = `${urls.usersSignup}`;
    return this.apiService.post(url, payload);
  }

  addToCart(id: string, payload: any): Observable<any> {
    const url = `${urls.addToCart}${id}`;
    return this.apiService.post(url, payload);
  }

}
