import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageShellComponent } from './homepage-shell.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LazyElementsTestingModule } from '@angular-extensions/elements/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { clearName } from '../store/actions/name/name.actions';
import { selectName } from '../store/selectors/name/name.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomepageShellComponent', () => {
  let component: HomepageShellComponent;
  let fixture: ComponentFixture<HomepageShellComponent>;
  let store: MockStore;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  const initialState = {
    name: {
      firstName: '',
      lastName: ''
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HomepageShellComponent],
      imports: [
        RouterTestingModule,
        LazyElementsTestingModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: { url: of(['home', 'test']) } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of({ firstName: 'Louis', lastName: 'Armstrong' }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageShellComponent);
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

  it('nameState$ should reach out to store on construction', async(() => {
    expect(store.select).toHaveBeenCalledWith(selectName);
    expect(store.select).toHaveBeenCalledTimes(1);
    component.nameState$.subscribe(name => expect(name).toEqual({ firstName: 'Louis', lastName: 'Armstrong' }));
  }));

  it('routerState$ is set with route on construction', async(() => {
    component.routerState$.subscribe(route => expect(route).toEqual('/home/test'));
  }));
});
