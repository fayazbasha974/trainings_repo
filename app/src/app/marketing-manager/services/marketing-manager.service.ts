import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { urls } from '../../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class MarketingManagerService {

  constructor(private readonly apiService: ApiService) { }

  getItems(url: string): Observable<any> {
    return this.apiService.get(url);
  }

  login(payload: any): Observable<any> {
    const url = urls.marketingManagerLogin;
    return this.apiService.post(url, payload);
  }

}
