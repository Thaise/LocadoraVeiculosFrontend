import { RetornoBusca } from './retorno-busca';
import { Component, OnInit, EventEmitter, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VeiculoService } from './../veiculo.service';
import { Veiculo } from './../veiculo';
import { VeiculoBusca } from './veiculo-busca';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
  selector: 'app-veiculo-report',
  templateUrl: './veiculo-report.component.html',
  styleUrls: ['./veiculo-report.component.css']
})
export class VeiculoReportComponent implements OnInit {


  @ViewChild('placaInput') placaInput: ElementRef;

  onPaginate: EventEmitter<number> = new EventEmitter<number>();
  pagina: number;
  qtdPorPagina: number;
  qtdPaginas: number;
  totalRegistros: number;

  filtro: VeiculoBusca = new VeiculoBusca();
  registros: Veiculo[] = [];
  selecionado: Veiculo;
  mensagemRetorno: string;
  tipoMsgRetorno: string = "";
  resposta: any;

  constructor(protected veiculoService: VeiculoService, protected routerParams: ActivatedRoute, protected dataService: DataService, private renderer: Renderer2, private modalService: NgbModal) { }

  ngOnInit() {
    this.qtdPaginas = 1;
    this.qtdPorPagina = 5;
    this.pagina = +this.routerParams.snapshot.queryParams['pagina'] || 1;

    setTimeout(() => { this.buscaRegistros(false) }, 1);

    this.dataService.filtroAtual.subscribe(f => this.filtro = f);

    window.history.pushState({}, document.title, window.location.pathname);

  }

  executaPaginacao($event: any) {
    this.pagina = $event;

    this.buscaRegistros(false);
  }


  alteraMaxRegistros($event: any) {
    this.qtdPorPagina = $event;

    this.buscaRegistros(false);
  }

  selecionaParaRemover(item: Veiculo, modal) {
    this.selecionado = item;
    this.modalService.open(modal);
  }

  remove() {
    if (this.selecionado) {
      this.veiculoService.remove(this.selecionado.idVeiculo).subscribe
        (data => {
          this.tipoMsgRetorno = "success";
          this.mensagemRetorno = "Veículo removido com sucesso";
          this.buscaRegistros(false);
        },
        error => {
          console.log(error);
          this.tipoMsgRetorno = "danger";
          this.mensagemRetorno = "Erro ao remover veículo";
        });
    }
  }

  buscaRegistros(comFiltro: boolean) {

    if (comFiltro) {
      this.pagina = 1;
    }

    console.log(this.qtdPorPagina);
    this.filtro.maxItensRetorno = this.qtdPorPagina;
    this.filtro.pagina = this.pagina;

    this.dataService.setFiltro(this.filtro);

    this.veiculoService.getRegistros(this.filtro).subscribe
      (data => {
        console.log(data);
        this.registros = data.veiculos;
        this.totalRegistros = data.quantidade;
        this.qtdPaginas = Math.ceil(this.totalRegistros / this.qtdPorPagina);
      },
      error => {
        console.log(error);
        this.tipoMsgRetorno = "danger";
        this.mensagemRetorno = "Erro ao buscar registros";
      });
  }

  getDescricao(status) {
    let desc: string;
    if (status === 'DISPONIVEL') {
      desc = "Disponível";
    } else if (status === "ALUGADO") {
      desc = "Alugado";
    } else {
      desc = "Em Reparo";
    }

    return desc;
  }

  limpa() {
    this.filtro = new VeiculoBusca();
    console.log(this.placaInput);
    this.renderer.setProperty(this.placaInput.nativeElement, 'value', '');
    console.log(this.filtro);
    this.pagina = 1;
    this.routerParams.queryParams = new Observable<Params>();
    this.buscaRegistros(false);
  }





}
