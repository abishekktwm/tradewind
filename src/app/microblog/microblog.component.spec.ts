import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroblogComponent } from './microblog.component';

describe('MicroblogComponent', () => {
  let component: MicroblogComponent;
  let fixture: ComponentFixture<MicroblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
