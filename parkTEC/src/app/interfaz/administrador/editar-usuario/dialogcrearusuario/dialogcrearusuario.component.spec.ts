import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcrearusuarioComponent } from './dialogcrearusuario.component';

describe('DialogcrearusuarioComponent', () => {
  let component: DialogcrearusuarioComponent;
  let fixture: ComponentFixture<DialogcrearusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcrearusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcrearusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
