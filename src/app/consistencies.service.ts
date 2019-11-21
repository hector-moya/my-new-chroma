import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Consistency {
  consistencyID: Number,
  consistencyName: String,
  consistencyDescription: String,
  isUpdating: boolean,

}


const API_URL: string = 'http://localhost:8000';
@Injectable({
  providedIn: 'root'
})
export class ConsistenciesService {

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

  getConsistencies(): Observable<Consistency[]> {
    return this.http.get(API_URL + '/api/consistencies',
      new RequestOptions({ headers: this.headers })
    )
    .map(res => {
      let modifiedResult = res.json().data
            modifiedResult = modifiedResult.map(function(consistency) {
              consistency.isUpdating = false;
        return consistency;
      });
      return modifiedResult;
    });
  }

  
}
