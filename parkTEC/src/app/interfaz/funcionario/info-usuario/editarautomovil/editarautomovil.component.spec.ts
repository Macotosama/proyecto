import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarautomovilComponent } from './editarautomovil.component';

describe('EditarautomovilComponent', () => {
  let component: EditarautomovilComponent;
  let fixture: ComponentFixture<EditarautomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarautomovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarautomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
