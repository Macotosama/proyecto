import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperarioParqueoComponent } from './operario-parqueo.component';

describe('OperarioParqueoComponent', () => {
  let component: OperarioParqueoComponent;
  let fixture: ComponentFixture<OperarioParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperarioParqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperarioParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
