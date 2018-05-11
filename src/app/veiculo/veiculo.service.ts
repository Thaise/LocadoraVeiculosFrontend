import { RetornoBusca } from './veiculo-report/retorno-busca';
import { Contantes } from './contantes';
import { Veiculo } from './veiculo';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { VeiculoBusca } from './veiculo-report/veiculo-busca';

@Injectable()
export class VeiculoService {

    private baseUrl: string = 'http://localhost:8080/cadastrodeveiculos/rest/veiculo';

    constructor(private http: HttpClient) {
    }

    insere(veiculo: Veiculo): Observable<Response> {
        let veiculoJson: string = JSON.stringify(veiculo);
        console.log('Insere veiculo: ' + veiculo.modelo);
        return this.http.post<Response>(`${this.baseUrl}/cadastra`, veiculoJson, Contantes.httpOptions);
    }


    atualiza(veiculo: Veiculo): Observable<Response> {
        let veiculoJson: string = JSON.stringify(veiculo);
        console.log('Atualiza veiculo: ' + veiculo.modelo);
        return this.http.post<Response>(`${this.baseUrl}/atualiza`, veiculoJson, Contantes.httpOptions);
    }


    remove(veiculo: Veiculo): Observable<Response> {
        let veiculoJson: string = JSON.stringify(veiculo);
        console.log('Remove veiculo: ' + veiculo.modelo);
        return this.http.post<Response>(`${this.baseUrl}/remove`, veiculoJson, Contantes.httpOptions);
    }

    getPeloId(id: number): Observable<Veiculo> {
        console.log('Busca veiculo pelo ID: ' + id);
        return this.http.get<Veiculo>(`${this.baseUrl}/buscaPeloId/` + id, Contantes.httpOptions);
    }

    getRegistros(filtro: VeiculoBusca): Observable<RetornoBusca> {
        let filtroJson: string = JSON.stringify(filtro);
        console.log('Busca veiculos (filtros) - página ' + filtro.pagina + " quantidade por página: " + filtro.maxItensRetorno);
        return this.http.post<RetornoBusca>(`${this.baseUrl}/buscaPorFiltros`, filtroJson, Contantes.httpOptions);
    }

    validaChassi(veiculo: Veiculo): Observable<Response> {
        let veiculoJson: string = JSON.stringify(veiculo);
        console.log('Valida Chassi do veiculo: ' + veiculo.modelo);
        return this.http.post<Response>(`${this.baseUrl}/validaChassi`, veiculoJson, Contantes.httpOptions);
    }

    validaPlaca(veiculo: Veiculo): Observable<Response> {
        let veiculoJson: string = JSON.stringify(veiculo);
        console.log('Valida Chassi do veiculo: ' + veiculo.modelo);
        return this.http.post<Response>(`${this.baseUrl}/validaPlaca`, veiculoJson, Contantes.httpOptions);
    }
}
