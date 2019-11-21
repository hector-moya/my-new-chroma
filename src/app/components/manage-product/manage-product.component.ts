import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Products } from '../../classes/products';
import { Grade, GradesService } from '../../grades.service';
import { Medium, MediumsService } from '../../mediums.service';
import { Manufacturer, ManufacturersService } from '../../manufacturers.service';
import { Consistency, ConsistenciesService } from '../../consistencies.service';
import { OktaAuthService } from '@okta/okta-angular';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  productForm = new FormGroup({
    productName: new FormControl(''),
    colourRange: new FormControl(''),
    gradeID: new FormControl(''),
    consistencyID: new FormControl(''),
    productDescription: new FormControl(''),
    manufacturerID: new FormControl(''),
    mediumID: new FormControl(''),
  });


  grades: Grade[];
  mediums: Medium[];
  manufacturers: Manufacturer[];
  consistencies: Consistency[];
  errorMessage: string;
  errors: string = '';
  isLoading: boolean = false;




  onSubmit(productForm) {
    console.log(productForm);
  }

  //productForm: Products[];

  constructor(
    private productsService: ProductsService,
    private mediumsService: MediumsService,
    private gradesService: GradesService,
    private manufacturersService: ManufacturersService,
    private consistenciesService: ConsistenciesService,
    private oktaAuth: OktaAuthService
  ) { }


  async ngOnInit() {
    await this.oktaAuth.getAccessToken();
    this.getGrades();
    this.getMediums();
    this.getConsistencies();
    this.getManufacturers();

  }

  @Output()
  productAdded: EventEmitter<Products> = new EventEmitter<Products>();

  show() {
    console.log(this.productForm.value);
  }

  // Post Product
  addProduct(productForm) {
    this.isLoading = true;
    this.productsService
      .addProduct(productForm)
      .subscribe(
        product => {
          this.isLoading = false;
          product.isUpdating = false;
          this.productAdded.emit(productForm);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
      this.productForm.reset();
  }

  // Get Grades

  getGrades() {
    this.gradesService
      .getGrades()
      .subscribe(
        grades => this.grades = grades,
        error => this.errorMessage = <any>error
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
        mediums => this.mediums = mediums,
        error => this.errorMessage = <any>error
      );
  }
  findMediums(mediumName): Medium {
    return this.mediums.find(medium => medium.mediumName === mediumName);
  }
  /*isUpdating(mediumID): boolean {
    return this.findGrade(mediumID).isUpdating;
  }*/

  // Get Manufactures

  getManufacturers() {
    this.manufacturersService
      .getManufacturers()
      .subscribe(
        manufacturers => this.manufacturers = manufacturers,
        error => this.errorMessage = <any>error
      );
  }
  findManufacturers(manufacturerName): Manufacturer {
    return this.manufacturers.find(manufacturer => manufacturer.manufacturerName === manufacturerName);
  }

  // Get Consistencies

  getConsistencies() {
    this.consistenciesService
      .getConsistencies()
      .subscribe(
        consistencies => this.consistencies = consistencies,
        error => this.errorMessage = <any>error
      );
  }
  findConsistencies(consistencyName): Consistency {
    return this.consistencies.find(consistency => consistency.consistencyName === consistencyName);
  }

}
