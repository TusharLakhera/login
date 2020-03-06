import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = 'https://login-790c7.firebaseio.com/login.json';

  constructor(private _http: HttpClient) { }
  register(userData) {
    return this._http.put<any>(this._url, userData)
    
  }
}
