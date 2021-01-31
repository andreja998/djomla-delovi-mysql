import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretrazivacComponent } from './pretrazivac.component';

describe('PretrazivacComponent', () => {
  let component: PretrazivacComponent;
  let fixture: ComponentFixture<PretrazivacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretrazivacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretrazivacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
