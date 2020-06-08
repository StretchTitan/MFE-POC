import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingShellComponent } from './billing-shell.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LazyElementsTestingModule } from '@angular-extensions/elements/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { clearName } from '../store/actions/name/name.actions';
import { selectName } from '../store/selectors/name/name.selectors';
import { of } from 'rxjs';

describe('BillingShellComponent', () => {
  let component: BillingShellComponent;
  let fixture: ComponentFixture<BillingShellComponent>;
  let store: MockStore;
  const initialState = {
    name: {
      firstName: '',
      lastName: ''
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BillingShellComponent],
      imports: [LazyElementsTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of({ firstName: 'Louis', lastName: 'Armstrong' }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleMessage should dispatch appropriate action', () => {
    component.handleMessage({ detail: { action: 'clearName' } });

    expect(store.dispatch).toHaveBeenCalledWith(clearName());
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('nameState selector', () => {
    expect(store.select).toHaveBeenCalledWith(selectName);
    expect(store.select).toHaveBeenCalledTimes(1);
    component.nameState$.subscribe(name => expect(name).toEqual({ firstName: 'Louis', lastName: 'Armstrong' }));
  });
});
