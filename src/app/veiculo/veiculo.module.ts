import { DataService } from './data.service';
import { VeiculoService } from './veiculo.service';
import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';
import { VeiculoReportComponent } from './veiculo-report/veiculo-report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    VeiculoReportComponent,
    VeiculoCadastroComponent,
  ],
  exports: [
    VeiculoReportComponent,
    VeiculoCadastroComponent,
  ],
  providers:[
    VeiculoService,
    DataService
  ]
})
export class VeiculoModule { }
