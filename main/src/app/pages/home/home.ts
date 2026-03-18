import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta-service';
import { CommonModule } from '@angular/common';
import { Receta } from '../../models/Receta';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario-service';
import { forkJoin } from 'rxjs';
import { Etiqueta } from '../../models/Etiqueta';
import { RecetaEtiqueta } from '../../models/RecetaEtiqueta';
import { EtiquetaService } from '../../services/etiqueta-service';
import { RecetaEtiquetaService } from '../../services/rec-eti-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  recetas:Receta[] = [];
  autores:Usuario[] = [];
  etiquetas:Etiqueta[] = [];
  constructor(private service:RecetaService, private autor:UsuarioService, 
    private cd:ChangeDetectorRef, private etiquetaService:EtiquetaService){}
  
  ngOnInit(): void {
    forkJoin({
      recetas: this.service.getRecetas(),
      autores: this.autor.getUsuarios(),
      etiquetas : this.etiquetaService.getEtiquetas()
    }).subscribe(({recetas,autores, etiquetas}) =>{
      this.autores = autores;
      this.etiquetas = etiquetas;
      this.recetas = recetas.map(r=> ({
        ...r,
        autor:autores.find(a=> a.id  === r.usuarioId)?.nombre || 'Desconocido'
      }))
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
