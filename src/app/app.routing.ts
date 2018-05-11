import { VeiculoReportComponent } from './veiculo/veiculo-report/veiculo-report.component';

import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VeiculoCadastroComponent } from './veiculo/veiculo-cadastro/veiculo-cadastro.component';

const APP_ROUTES:Routes = [
    {path:'', component:VeiculoReportComponent},
    {path:'veiculos', component:VeiculoReportComponent},
    {path:'veiculo/cadastro/:id', component:VeiculoCadastroComponent},
    {path:'veiculo/visualizacao/:id', component:VeiculoCadastroComponent},
    {path:'veiculo/cadastro', component:VeiculoCadastroComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);