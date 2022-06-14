import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOperarioComponent } from './menu-operario.component';

describe('MenuOperarioComponent', () => {
  let component: MenuOperarioComponent;
  let fixture: ComponentFixture<MenuOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuOperarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
