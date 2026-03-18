import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EtiquetaService } from '../../services/etiqueta-service';
import { Etiqueta, EtiquetaFiltro } from '../../models/Etiqueta';
import { Ingrediente, IngredienteFiltro } from '../../models/Ingrediente';
import { IngredienteService } from '../../services/ingrediente-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {

  isOpen: boolean = false;
  isOpenE:boolean = false;
  isOpenI: boolean = false;
  etiquetas: EtiquetaFiltro[] = [];
  ingredientes: IngredienteFiltro[] = [];
  nombreI = "";
  nombreE = "";
  nuevoI?:Ingrediente;
  nuevoE?:Etiqueta;

  constructor(private etiquetaService: EtiquetaService,
    private ingredienteService:IngredienteService,
    private cd:ChangeDetectorRef
  ) {}
  ngOnInit(): void {
  this.etiquetaService.getEtiquetas().subscribe(data => {
    this.etiquetas = data.map(e => ({
      ...e,
      selected: false
    }));
  });
  this.ingredienteService.getIngredientes().subscribe(data =>{
    this.ingredientes = data.map(i => ({
      ...i,
      selected: false
    }))
  })
  this.cd.detectChanges();
}
  abrirModalI(){
    this.isOpen = false; 
    this.isOpenI= true;
  }
  cerrarModalI(){
    this.isOpenI = false;
    this.isOpen = true; 
  }
  abrirModalE(){
    this.isOpen = false; 
    this.isOpenE = true;
  }
  cerrarModalE(){
    this.isOpenE = false;
    this.isOpen = true; 
  }

  abrirFiltro() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarFiltro() {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  toggleIngrediente(item: IngredienteFiltro) {
    item.selected = !item.selected;
  }

  toggleEtiqueta(item: EtiquetaFiltro) {
    item.selected = !item.selected;
  }
  agregarIngrediente(){
    this.nuevoI = {id: 0, nombre: this.nombreI}
    this.ingredienteService.postIngrediente(this.nuevoI).subscribe(()=>{
      this.ingredienteService.getIngredientes().subscribe(data =>{
      this.ingredientes = data.map(i => ({
      ...i,
      selected: false
    }))
      alert("Ingrediente añadido con éxito");
      this.cerrarModalI();
      this.nombreI = '';
  })
    })
  }
  agregarEtiqueta(){
    this.nuevoE = {id: 0, nombre: this.nombreE}
    this.etiquetaService.postEtiqueta(this.nuevoE).subscribe(()=>{
      this.etiquetaService.getEtiquetas().subscribe(data => {
      this.etiquetas = data.map(e => ({
      ...e,
      selected: false
    }));
    alert("Etiqueta Añadida con exito")
    this.cerrarModalE();
  });
    }) 
  }
  obtenerFiltros() {
    const ingredientesSeleccionados = this.ingredientes
      .filter(i => i.selected)
      .map(i => i.id);

    const etiquetasSeleccionadas = this.etiquetas
      .filter(e => e.selected)
      .map(e => e.id);

    return {
      ingredientes: ingredientesSeleccionados,
      etiquetas: etiquetasSeleccionadas
    };
  }
  deselectI() {
    this.ingredientes = this.ingredientes.map(i => ({
      ...i,
      selected: false
  }));
}
  deselectE(){
    this.etiquetas = this.etiquetas.map(e => ({
      ...e,
      selected: false
    }))
  }

  Buscar() {}
}