import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface ProductPrices {
  productPriceID: Number,
  productID: Number,
  storeID: Number,
  price: Number,
  storeName: String,
  websiteURL: String,
  email: String,
  isUpdating: Boolean,
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {

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
  getProductPrices(): Observable<ProductPrices[]> {
    return this.http.get(API_URL + '/api/productprices',
      new RequestOptions({ headers: this.headers })
    )
    .map(res => {
      let modifiedResult = res.json().data
            modifiedResult = modifiedResult.map(function(productprice) {
              productprice.isUpdating = false;
        return productprice;
      });
      return modifiedResult;
    });
  }
}
