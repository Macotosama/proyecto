import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueosComponent } from './parqueos.component';

describe('ParqueosComponent', () => {
  let component: ParqueosComponent;
  let fixture: ComponentFixture<ParqueosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParqueosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
