import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAppComponent } from './state-app.component';

describe('StateAppComponent', () => {
  let component: StateAppComponent;
  let fixture: ComponentFixture<StateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
