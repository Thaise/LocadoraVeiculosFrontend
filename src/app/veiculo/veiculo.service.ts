import { RetornoBusca } from './veiculo-report/retorno-busca';
import { Contantes } from './contantes';
import { Veiculo } from './veiculo';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { VeiculoBusca } from './veiculo-report/veiculo-busca';

@Injectable()
export class VeiculoService {

    private baseUrl: string = 'http://localhost:8080/cadastrodeveiculos/rest/veiculos';

    constructor(private http: HttpClient) {
    }

    insere(veiculo: Veiculo): Observable<Response> {
        let veiculoJson: string = JSON.stringify(veiculo);
        console.log('Insere veiculo: ' + veiculoJson);
        return this.http.post<Response>(`${this.baseUrl}`, veiculoJson, Contantes.httpOptions);
    }


    atualiza(veiculo: Veiculo): Observable<Response> {
        let veiculoJson: string = JSON.stringify(veiculo);
        console.log('Atualiza veiculo: ' + veiculoJson);
        return this.http.put<Response>(`${this.baseUrl}`, veiculoJson, Contantes.httpOptions);
    }


    remove(id: number): Observable<Response> {
        console.log('Remove veiculo de id: ' + id);
        return this.http.delete<Response>(`${this.baseUrl}/`+ id, Contantes.httpOptions);
    }

    getPeloId(id: number): Observable<Veiculo> {
        console.log('Busca veiculo pelo ID: ' + id);
        return this.http.get<Veiculo>(`${this.baseUrl}/` + id, Contantes.httpOptions);
    }

    getRegistros(filtro: VeiculoBusca): Observable<RetornoBusca> {
        let filtroJson: string = JSON.stringify(filtro);
        console.log('Busca veiculos (filtros) - página ' + filtro.pagina + " quantidade por página: " + filtro.maxItensRetorno);

        let urlCompleta : string = `${this.baseUrl}/query?maxItensRetorno=`+filtro.maxItensRetorno+"&pagina="+filtro.pagina;

        if(filtro.modelo){
            urlCompleta += "&modelo="+filtro.modelo;
        }

        if(filtro.marca){
            urlCompleta += "&marca="+filtro.marca;
        }

        if(filtro.placa){
            urlCompleta += "&placa="+filtro.placa;
        }

        return this.http.get<RetornoBusca>(urlCompleta, Contantes.httpOptions);
    }

    validaChassi(chassi : string, id : number): Observable<Response> {
        let urlCompleta : string = `${this.baseUrl}/validaChassi/`+chassi + "?id="+(id ? id : 0);
        console.log('Valida Chassi do veiculo de id: ' + id);
        return this.http.get<Response>(urlCompleta, Contantes.httpOptions);
    }

    validaPlaca(placa : string, id : number): Observable<Response> {
        let urlCompleta : string = `${this.baseUrl}/validaPlaca/`+placa+ "?id="+(id ? id : 0);
        console.log('Valida Placa do veiculo de id: ' + id);
        return this.http.get<Response>(urlCompleta, Contantes.httpOptions);
    }
}
