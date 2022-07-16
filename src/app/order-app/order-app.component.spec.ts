import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAppComponent } from './order-app.component';

describe('OrderAppComponent', () => {
  let component: OrderAppComponent;
  let fixture: ComponentFixture<OrderAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
