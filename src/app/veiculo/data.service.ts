import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService{

  private filtro = new BehaviorSubject<any>({});
  filtroAtual = this.filtro.asObservable();

  constructor() {

  }

  setFiltro(filter: any) {
    this.filtro.next(filter);
  }

}
