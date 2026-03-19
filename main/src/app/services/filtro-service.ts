import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  
  private filtrosSubject = new BehaviorSubject<{modo: number, busqueda: string, ingredientes: string[], etiquetas: string[]}>({
    modo: 0,
    busqueda: '',
    ingredientes: [],
    etiquetas: []
  });

  filtros$ = this.filtrosSubject.asObservable();

  actualizarFiltros(nuevosFiltros: any) {
    this.filtrosSubject.next(nuevosFiltros);
  }
}