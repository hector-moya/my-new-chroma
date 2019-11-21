import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Store {

  storeID: Number,
  storeName: String,
  email: String,
  phoneNumber: String,
  websiteURL: String,
  isUpdating: boolean,

}


const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})


export class StoresService {

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

  addStore(storeForm: Store): Observable<Store> {
    return this.http.post(API_URL + '/api/stores', storeForm,
      new RequestOptions({ headers: this.headers })
    ).map(res => res.json().data);
  }


  getStore(): Observable<Store[]> {
    return this.http.get(API_URL + '/api/stores',
      new RequestOptions({ headers: this.headers })
    )
      .map(res => {
        let modifiedResult = res.json().data
        modifiedResult = modifiedResult.map(function (store) {
          store.isUpdating = false;
          return store;
        });
        return modifiedResult;
      });
  }
}
