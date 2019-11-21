import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store, StoresService } from '../../stores.service';
import { OktaAuthService } from '@okta/okta-angular';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.scss']
})
export class ManageStoreComponent implements OnInit {

  stores: Store[];

  storeForm = new FormGroup({
    storeName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    websiteURL: new FormControl(''),
  });
  errorMessage: string;
  errors: string = '';
  isLoading: boolean = false;

  displayedColumns: string[] = ['storeName', 'email', 'websiteURL', 'phoneNumber'];

  onSubmit(productForm) {
    console.log(productForm);
  }
  constructor(
    private storesService: StoresService,
    private oktaAuth: OktaAuthService
  ) { }

  async ngOnInit() {
    await this.oktaAuth.getAccessToken();
    this.getStores();
    

  }

  @Output()
  productAdded: EventEmitter<Store> = new EventEmitter<Store>();

  show() {
    console.log(this.storeForm.value);
  }

  addStore(storeForm) {
    this.isLoading = true;
    this.storesService
      .addStore(storeForm)
      .subscribe(
        store => {
          this.isLoading = false;
          store.isUpdating = false;
          this.productAdded.emit(storeForm);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
      this.storeForm.reset();
  }
  

  getStores() {
    this.storesService
      .getStore()
      .subscribe(
        stores => this.stores = stores,
        error => this.errorMessage = <any>error
      );
  }
}
