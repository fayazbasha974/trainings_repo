import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { urls } from '../../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly apiService: ApiService) { }

  saveWebinar(payload: any): Observable<any> {
    const path = 'webinars/save';
    return this.apiService.post(path, payload);
  }

  getWebinars(): Observable<any> {
    const path = urls.getWebinar;
    return this.apiService.get(path);
  }

  getWebinar(filter: string): Observable<any> {
    const path = `${urls.getWebinar}${filter}`;
    return this.apiService.get(path);
  }

  deleteWebinar(id: string): Observable<any> {
    const path = `${urls.deleteWebinar}${id}`;
    return this.apiService.delete(path);
  }

  login(payload: any): Observable<any> {
    const path = urls.adminLogin;
    return this.apiService.post(path, payload);
  }

}
