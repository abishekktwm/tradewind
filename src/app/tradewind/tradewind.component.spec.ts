import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradewindComponent } from './tradewind.component';

describe('TradewindComponent', () => {
  let component: TradewindComponent;
  let fixture: ComponentFixture<TradewindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradewindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradewindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
