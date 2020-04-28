import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageShellComponent } from './homepage-shell.component';

describe('HomepageShellComponent', () => {
  let component: HomepageShellComponent;
  let fixture: ComponentFixture<HomepageShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
