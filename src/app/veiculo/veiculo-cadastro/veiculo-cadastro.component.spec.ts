import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoCadastroComponent } from './veiculo-cadastro.component';

describe('VeiculoCadastroComponent', () => {
  let component: VeiculoCadastroComponent;
  let fixture: ComponentFixture<VeiculoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
