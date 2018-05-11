import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoReportComponent } from './veiculo-report.component';

describe('VeiculoReportComponent', () => {
  let component: VeiculoReportComponent;
  let fixture: ComponentFixture<VeiculoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
