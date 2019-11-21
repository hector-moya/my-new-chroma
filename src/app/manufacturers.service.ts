import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Manufacturer {
  manufacturerID: Number,
  manufacturerName: String,
  country: String,
  state: String,
  addess: String,
  phoneNumber: String,
  email: String,
  isUpdating: boolean,

}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {

  private accessToken;
  private headers;

  constructor(private oktaAuth: OktaAuthService, private http: Http) {
    this.init();
   }
   async init() {
    this.accessToken = await this.oktaAuth.getAccessToken();
    this.headers = new Headers({
      Authorization: 'Bearer ' + this.accessToken
    });
  }

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get(API_URL + '/api/manufacturers',
      new RequestOptions({ headers: this.headers })
    )
    .map(res => {
      let modifiedResult = res.json().data
            modifiedResult = modifiedResult.map(function(manufacturer) {
              manufacturer.isUpdating = false;
        return manufacturer;
      });
      return modifiedResult;
    });
  }
}
