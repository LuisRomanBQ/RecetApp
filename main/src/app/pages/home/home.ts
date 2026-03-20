import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta-service';
import { CommonModule } from '@angular/common';
import { Receta } from '../../models/Receta';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario-service';
import { forkJoin,Observable, switchMap } from 'rxjs';
import { Etiqueta } from '../../models/Etiqueta';
import { EtiquetaService } from '../../services/etiqueta-service';
import { FiltroService } from '../../services/filtro-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  recetas:Receta[] = [];
  autores:Usuario[] = [];
  etiquetas:Etiqueta[] = [];
  filtroE: string = '';
  filtroI: string = '';
  busqueda: string = '';
  modo: number = 0;
  constructor(private service:RecetaService, private autor:UsuarioService, 
    private cd:ChangeDetectorRef, private etiquetaService:EtiquetaService,
    private filtroService:FiltroService  
  ){}
  
  ngOnInit(): void {
    this.filtroService.filtros$.pipe(
      switchMap(filtros =>{
        this.busqueda = filtros.busqueda;
        this.filtroI = filtros.ingredientes.join(',');
        this.filtroE = filtros.etiquetas.join(',');
        this.modo = filtros.modo;

        let recetas$: Observable<Receta[]>;
        switch(this.modo) {
          case 1: recetas$ = this.service.getByIngredientes(this.filtroI); break;
          case 2: recetas$ = this.service.getByIngredientesCon(this.filtroI); break;
          case 3: recetas$ = this.service.getByIngredientesEx(this.filtroI); break;
          case 4: recetas$ = this.service.getbyEtiquetas(this.filtroE); break;
          default: recetas$ = this.service.getRecetas(); break;
        }
        return forkJoin({
          recetas: recetas$,
          autores: this.autor.getUsuarios(),
          etiquetas: this.etiquetaService.getEtiquetas()
        });
      })
    ).subscribe(({recetas, autores, etiquetas})=>{
      this.autores = autores,
      this.etiquetas = etiquetas;
      this.recetas = recetas.map(r =>({
        ...r,
        autor: autores.find(a=> a.id === r.usuarioId)?.nombre || 'Desconocido'
      }));

      if(this.busqueda){
        this.recetas = this.recetas.filter(r=>
          r.titulo.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      }
      this.cd.detectChanges();
    })
  }
  getDificultadTexto(valor: number): string {
  switch (valor) {
    case 1: return 'Fácil';
    case 2: return 'Media';
    case 3: return 'Difícil';
    default: return 'Desconocido';
  }}
  
}
