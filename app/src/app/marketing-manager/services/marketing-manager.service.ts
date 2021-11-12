import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketingManagerService {

  urls = {
    getOrders: 'orders'
  }

  constructor(private readonly apiService: ApiService) { }

  getOrders(): Observable<any> {
    const url = `${this.urls.getOrders}`;
    return this.apiService.get(url);
  }

}
