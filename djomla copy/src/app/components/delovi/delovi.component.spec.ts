import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeloviComponent } from './delovi.component';

describe('DeloviComponent', () => {
  let component: DeloviComponent;
  let fixture: ComponentFixture<DeloviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeloviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeloviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
