import { VeiculoModule } from './veiculo/veiculo.module';
import { VeiculoReportComponent } from './veiculo/veiculo-report/veiculo-report.component';
import { VeiculoCadastroComponent } from './veiculo/veiculo-cadastro/veiculo-cadastro.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import {NgxMaskModule} from 'ngx-mask';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    VeiculoModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
