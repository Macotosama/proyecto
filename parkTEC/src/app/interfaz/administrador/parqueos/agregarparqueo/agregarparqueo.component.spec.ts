import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarparqueoComponent } from './agregarparqueo.component';

describe('AgregarparqueoComponent', () => {
  let component: AgregarparqueoComponent;
  let fixture: ComponentFixture<AgregarparqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarparqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarparqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
