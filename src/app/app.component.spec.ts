import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { setName } from './store/actions/name/name.actions';
import { selectName } from './store/selectors/name/name.selectors';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = {
    name: {
      firstName: '',
      lastName: ''
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of({ firstName: 'Louis', lastName: 'Armstrong' }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should populate setName on construction', async(() => {
    expect(store.select).toHaveBeenCalledWith(selectName);
    expect(store.select).toHaveBeenCalledTimes(1);

    component.name$.subscribe(name => expect(name).toEqual('Set Name: Louis Armstrong'));
  }));

  it('should call setName action when submitForm is called', () => {
    const firstNameInput = component.nameForm.controls.firstName;
    const lastNameInput = component.nameForm.controls.lastName;

    firstNameInput.setValue('Bob');
    lastNameInput.setValue('Dylan');
    component.submitForm();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(setName({ firstName: 'Bob', lastName: 'Dylan' }));
  });
});
