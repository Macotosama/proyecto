import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearautomovilComponent } from './crearautomovil.component';

describe('CrearautomovilComponent', () => {
  let component: CrearautomovilComponent;
  let fixture: ComponentFixture<CrearautomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearautomovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearautomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
