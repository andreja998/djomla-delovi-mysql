import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeloviDetailsComponent } from './delovi-details.component';

describe('DeloviDetailsComponent', () => {
  let component: DeloviDetailsComponent;
  let fixture: ComponentFixture<DeloviDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeloviDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeloviDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
