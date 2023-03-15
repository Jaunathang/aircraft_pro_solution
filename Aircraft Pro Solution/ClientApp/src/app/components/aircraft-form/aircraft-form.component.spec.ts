import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftFormComponent } from './aircraft-form.component';

describe('AircraftFormComponent', () => {
  let component: AircraftFormComponent;
  let fixture: ComponentFixture<AircraftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AircraftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
