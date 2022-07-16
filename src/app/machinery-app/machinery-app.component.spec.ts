import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryAppComponent } from './machinery-app.component';

describe('MachineryAppComponent', () => {
  let component: MachineryAppComponent;
  let fixture: ComponentFixture<MachineryAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineryAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineryAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
