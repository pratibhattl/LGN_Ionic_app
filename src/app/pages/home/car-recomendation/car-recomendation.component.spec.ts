import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRecomendationComponent } from './car-recomendation.component';

describe('CarRecomendationComponent', () => {
  let component: CarRecomendationComponent;
  let fixture: ComponentFixture<CarRecomendationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRecomendationComponent]
    });
    fixture = TestBed.createComponent(CarRecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
