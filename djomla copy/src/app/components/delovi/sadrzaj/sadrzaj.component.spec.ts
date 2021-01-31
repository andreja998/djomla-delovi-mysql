import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadrzajComponent } from './sadrzaj.component';

describe('SadrzajComponent', () => {
  let component: SadrzajComponent;
  let fixture: ComponentFixture<SadrzajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadrzajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadrzajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
