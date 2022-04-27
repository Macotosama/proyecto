import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtoUsuarioComponent } from './dto-usuario.component';

describe('DtoUsuarioComponent', () => {
  let component: DtoUsuarioComponent;
  let fixture: ComponentFixture<DtoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
