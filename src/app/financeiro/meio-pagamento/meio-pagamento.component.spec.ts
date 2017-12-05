import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeioPagamentoComponent } from './meio-pagamento.component';

describe('MeioPagamentoComponent', () => {
  let component: MeioPagamentoComponent;
  let fixture: ComponentFixture<MeioPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeioPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeioPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
