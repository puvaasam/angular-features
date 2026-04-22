import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountWidgetComponent } from './discount-widget.component';

describe('DiscountWidgetComponent', () => {
  let component: DiscountWidgetComponent;
  let fixture: ComponentFixture<DiscountWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
