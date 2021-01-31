import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDelovaComponent } from './lista-delova.component';

describe('ListaDelovaComponent', () => {
  let component: ListaDelovaComponent;
  let fixture: ComponentFixture<ListaDelovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDelovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDelovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
