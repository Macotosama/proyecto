import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarparqueoComponent } from './editarparqueo.component';

describe('EditarparqueoComponent', () => {
  let component: EditarparqueoComponent;
  let fixture: ComponentFixture<EditarparqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarparqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarparqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
