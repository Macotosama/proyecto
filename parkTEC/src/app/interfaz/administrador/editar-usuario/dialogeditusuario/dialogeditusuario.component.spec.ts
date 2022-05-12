import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeditusuarioComponent } from './dialogeditusuario.component';

describe('DialogeditusuarioComponent', () => {
  let component: DialogeditusuarioComponent;
  let fixture: ComponentFixture<DialogeditusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogeditusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeditusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
