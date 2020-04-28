import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingShellComponent } from './billing-shell.component';

describe('BillingShellComponent', () => {
  let component: BillingShellComponent;
  let fixture: ComponentFixture<BillingShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
