import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesPageComponent } from './features-page.component';

describe('FeaturePageComponent', () => {
  let component: FeaturesPageComponent;
  let fixture: ComponentFixture<FeaturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
