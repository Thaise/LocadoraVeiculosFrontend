import { Veiculo } from './../veiculo';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VeiculoService } from '../veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-veiculo-cadastro',
  templateUrl: './veiculo-cadastro.component.html',
  styleUrls: ['./veiculo-cadastro.component.css']
})
export class VeiculoCadastroComponent implements OnInit {
  erro: any;
  mensagemRetorno: string;
  tipoMsgRetorno: string = "";
  resposta: any;
  veiculo: Veiculo = new Veiculo();
  veiculos: Veiculo[];
  camposDesabilitados: boolean;
  @ViewChild('chassiInput') chassiInput: ElementRef;
  @ViewChild('placaInput') placaInput: ElementRef;
  @ViewChild('veiculoForm') veiculoForm: ElementRef;

  constructor(private veiculoService: VeiculoService, private routerParams: ActivatedRoute, private router: Router) {
    setTimeout(() => { }, 1);
  }

  ngOnInit() {
    let id: number = null;
    this.routerParams.params.subscribe(params => {
      if (params['id']) {
        id = +params['id'];
      }
    });

    if (this.router.url.indexOf('visualizacao') >= 0) {
      this.camposDesabilitados = true;
    }

    if (id != null) {
      this.buscaPeloId(id);
    }
  }

  enviaDados() {
    if (!this.veiculoForm.nativeElement.classList.contains("ng-invalid") && !this.veiculoForm.nativeElement.classList.contains("erro-validacao")) {
      if (this.veiculo.idVeiculo) {
        this.atualiza();
      } else {
        this.insere();
      }
    } else {
      this.tipoMsgRetorno = "danger";
      this.mensagemRetorno = "O formulário não foi preenchido corretamente!";
    }

  }

  validaChassi() {
    if (this.veiculo.chassi) {
      this.veiculoService.validaChassi(this.veiculo.chassi, this.veiculo.idVeiculo).subscribe
        (data => { this.resposta = data },
        error => {
          this.erro = error.error;
          console.error(this.erro);
          this.tipoMsgRetorno = "danger";
          this.mensagemRetorno = this.erro.msg;
          this.chassiInput.nativeElement.classList.add("erro-validacao");
          this.veiculoForm.nativeElement.classList.add("erro-validacao");
        },
        () => {
          this.veiculo.chassi = this.veiculo.chassi.toUpperCase();
          this.tipoMsgRetorno = "";
          this.mensagemRetorno = null;
          this.chassiInput.nativeElement.classList.remove("erro-validacao");
          this.veiculoForm.nativeElement.classList.remove("erro-validacao");
        }
        );
    }
  }

  validaPlaca() {
    if (this.veiculo.placa) {
      this.veiculoService.validaPlaca(this.veiculo.placa, this.veiculo.idVeiculo).subscribe
        (l => this.resposta = l,
        error => {
          this.erro = error.error;
          console.error(this.erro);
          this.tipoMsgRetorno = "danger";
          this.mensagemRetorno = this.erro.msg;
          this.placaInput.nativeElement.classList.add("erro-validacao");
          this.veiculoForm.nativeElement.classList.add("erro-validacao");
        },
        () => {
          this.veiculo.placa = this.veiculo.placa.toUpperCase();
          this.tipoMsgRetorno = "";
          this.mensagemRetorno = null;
          this.placaInput.nativeElement.classList.remove("erro-validacao");
          this.veiculoForm.nativeElement.classList.remove("erro-validacao");
        }
        );
    }
  }

  insere() {
    this.veiculoService.insere(this.veiculo).subscribe
      (l => this.resposta = l,
      error => {
        this.erro = error.error;
        console.error("Erro " + this.erro.status + ": " + this.erro.msg);
        this.tipoMsgRetorno = "danger";
        this.mensagemRetorno = "Erro ao inserir veiculo '" + this.veiculo.modelo ;
      },
      () => {
        this.tipoMsgRetorno = "success";
        this.mensagemRetorno = "Sucesso ao inserir veiculo '" + this.veiculo.modelo + "'";
        this.veiculo = new Veiculo();
        this.navegaParaReport();
      }
      );

  }

  atualiza() {
    this.veiculoService.atualiza(this.veiculo).subscribe
      (l => this.resposta = l,
      error => {
        this.erro = error;
        console.error(this.erro);
        console.error("Erro " + this.erro.status + ": " + this.erro.msg);
        this.tipoMsgRetorno = "danger";
        this.mensagemRetorno = "Erro ao atualizar veiculo '" + this.veiculo.modelo ;
      },
      () => {
        this.tipoMsgRetorno = "success";
        this.mensagemRetorno = "Sucesso ao atualizar veiculo '" + this.veiculo.modelo + "'";
        this.navegaParaReport();
      }
      );
  }


  remove() {
    this.veiculoService.remove(this.veiculo.idVeiculo).subscribe
      (l => this.resposta = l,
      error => {
        this.erro = error;
        console.error("Erro " + this.erro.status + ": " + this.erro.msg);
        this.tipoMsgRetorno = "danger";
        this.mensagemRetorno = "Erro ao remover veiculo '" + this.veiculo.modelo ;
      },
      () => {
        this.tipoMsgRetorno = "success";
        this.mensagemRetorno = "Sucesso ao remover veiculo '" + this.veiculo.modelo + "'";
        this.navegaParaReport();
      }
      );
  }

  anoAtual() {
    let now = new Date();
    return now.getFullYear();
  }

  buscaPeloId(id: number) {
    this.veiculoService.getPeloId(id).subscribe
      (l => {
        this.veiculo = l;
      },
      error => {
        console.error(this.erro);
        this.tipoMsgRetorno = "danger";
        this.mensagemRetorno = "Erro ao buscar veiculo pelo id: " + id;
      },
      () => { }
      );

    if (this.veiculo == null) {
      this.tipoMsgRetorno = "warning";
      this.mensagemRetorno = "Veiculo não encontrada!";
      this.navegaParaReport();
    }

  }

  cancela() {
    this.navegaParaReport();
  }

  navegaParaReport() {
    this.router.navigateByUrl('/veiculos');
  }

}
