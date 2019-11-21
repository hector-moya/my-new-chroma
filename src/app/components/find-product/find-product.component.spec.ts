import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductComponent } from './find-product.component';

describe('FindProductComponent', () => {
  let component: FindProductComponent;
  let fixture: ComponentFixture<FindProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
