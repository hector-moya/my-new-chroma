import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Grade, GradesService } from '../../grades.service';
import { Medium, MediumsService } from '../../mediums.service';
import { ProductPrices, ProductPriceService } from '../../product-price.service';
import { Products, ProductsService } from '../../products.service';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

//Mat components


import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.scss']
})
export class FindProductComponent implements OnInit {

  grades: Grade[];
  mediums: Medium[];
  products: Products[];
  productprice: ProductPrices[];

  errors: string = '';

  errorMessage: string;
  isLoading: boolean = true;

  searchProduct = new FormGroup({
    gradeID: new FormControl(2),
    mediumID: new FormControl(1),
    productID: new FormControl(1),
  });
  displayedColumns: string[] = ['storeName', 'price', 'websiteURL'];

  gradeID = this.searchProduct.controls.gradeID;
  mediumID = this.searchProduct.controls.mediumID;
  productID = this.searchProduct.controls.productID;


  constructor(
    private productsService: ProductsService,
    private mediumsService: MediumsService,
    private gradesService: GradesService,
    private productpriceService: ProductPriceService,
    private oktaAuth: OktaAuthService
  ) { }

  async ngOnInit() {
    await this.oktaAuth.getAccessToken();
    this.getGrades();
    this.getMediums();
    this.getProducts();
    this.getProductPrice();

  }
  showGradeID() {
    console.log(this.gradeID.value);

  }
  showMediumID() {
    console.log(this.mediumID.value);
    
  }
  showProductID() {
    console.log(this.productID.value);
    console.log(this.productprice);
  }

  // Get Products

  getProducts() {
    this.productsService
      .getProducts()
      .subscribe(
        products => {
          this.products = products,
            this.isLoading = false
        },
        error => {
          this.errorMessage = <any>error,
            this.isLoading = false
        }
      );
  }

  findProduct(productName): Products {
    return this.products.find(product => product.productName === productName);
  }


  filterGradeById(id) {
    return this.products.filter(product => product.gradeID === id);
  }

  filterMediumById(id) {
    return this.mediums.filter(medium => medium.mediumID === id);
  }
  filterGrade(id) {
    return this.grades.filter(grade => grade.gradeID === id);
  }

  filterProductById(id) {
    return this.products.filter(product => product.productID === id);
  }

  filterProductPriceByProductId(id) {
    return this.productprice.filter(productPrice => productPrice.productID === id);
  }
  getStoreById(id) {
    return this.productprice.filter(store => store.storeID === id);
  }

  // Get Grades

  getGrades() {
    this.gradesService
      .getGrades()
      .subscribe(
        grades => {
          this.grades = grades,
            this.isLoading = false
        },
        error => {
          this.errorMessage = <any>error,
            this.isLoading = false
        }
      );
  }
  findGrade(gradeName): Grade {
    return this.grades.find(grade => grade.gradeName === gradeName);
  }
  /*isUpdating(gradeID): boolean {
    return this.findGrade(gradeID).isUpdating;
  }*/

  // Get Mediums

  getMediums() {
    this.mediumsService
      .getMediums()
      .subscribe(
        mediums => {
          this.mediums = mediums,
            this.isLoading = false
        },
        error => {
          this.errorMessage = <any>error,
            this.isLoading = false
        }
      );
  }
  findMediums(mediumName): Medium {
    return this.mediums.find(medium => medium.mediumName === mediumName);
  }
  /*isUpdating(mediumID): boolean {
    return this.findGrade(mediumID).isUpdating;
  }*/

  // Get Product Prices

  getProductPrice() {
    this.productpriceService
      .getProductPrices()
      .subscribe(
        productprices => {
          this.productprice = productprices,
            this.isLoading = false
        },
        error => {
          this.errorMessage = <any>error,
            this.isLoading = false
        }
      );
  }
  findProductPrice(productID): ProductPrices {
    return this.productprice.find(productprice => productprice.productID === productID);
  }
  /*isUpdating(mediumID): boolean {
    return this.findGrade(mediumID).isUpdating;
  }*/

}
