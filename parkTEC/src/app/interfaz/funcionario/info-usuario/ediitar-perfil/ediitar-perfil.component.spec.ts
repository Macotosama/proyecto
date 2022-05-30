import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiitarPerfilComponent } from './ediitar-perfil.component';

describe('EdiitarPerfilComponent', () => {
  let component: EdiitarPerfilComponent;
  let fixture: ComponentFixture<EdiitarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdiitarPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdiitarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
