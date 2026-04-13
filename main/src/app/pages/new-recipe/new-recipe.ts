import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta-service';
import { EtiquetaService } from '../../services/etiqueta-service';
import { IngredienteService } from '../../services/ingrediente-service';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Etiqueta, EtiquetaFiltro } from '../../models/Etiqueta';
import { Receta } from '../../models/Receta';
import { Paso } from '../../models/Paso';
import { PasoService } from '../../services/paso-service';
import { Ingrediente, IngredienteFiltro, IngredienteUI } from '../../models/Ingrediente';
import { Router } from '@angular/router';
import { FiltroService } from '../../services/filtro-service';
import { RecetaEtiquetaService } from '../../services/rec-eti-service';
import { RecetaIngredienteService } from '../../services/rec-ing-service';

@Component({
  selector: 'app-new-recipe',
  imports: [CommonModule,FormsModule],
  templateUrl: './new-recipe.html',
  styleUrl: './new-recipe.css',
})
export class NewRecipe implements OnInit {
  Etiquetas:Etiqueta[] = [];
  Ingredientes:Ingrediente[] = [];
  isOpen: boolean = false;
  isOpenE:boolean = false;
  isOpenI: boolean = false;
  etiquetas: EtiquetaFiltro[] = [];
  ingredientes: IngredienteUI[] = [];
  nombreI = "";
  nombreE = "";
  search: string = localStorage.getItem("busqueda") || '';
  searchE = "";
  searchI = "";
  nuevoI?:Ingrediente;
  nuevoE?:Etiqueta;
  pasos: Paso[] = [];
  nuevaReceta:Receta = {
    id:0,
    likes: 0,
    titulo: '',
    descripcion: '',
    porciones: 0,
    tiempoPreparacion: 0,
    dificultad: 1,
    usuarioId: Number(localStorage.getItem("userId")),
    autor: '',
  };
  constructor(
    private recetaService: RecetaService, 
    private etiquetaService:EtiquetaService,
    private ingredienteService:IngredienteService,
    private pasoService:PasoService,
    private recetaEtiquetaService: RecetaEtiquetaService,
    private recetaIngredienteService: RecetaIngredienteService,
  ){}
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
        selected: false,
        cantidad: 0,
        unidad: '',
        sustituto: false
      }));
    })
  
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
  cerrarFiltro(){
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  aplicarFiltro() {
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
      selected: false,
      cantidad: 0,
      unidad: '',
      sustituto: false
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
    this.ingredientes.forEach(i => i.selected = false);
  }
  deselectE(){
    this.etiquetas.forEach(e => e.selected = false);
  }
  guardarBusqueda(){
    const value = this.search.trim();
    localStorage.setItem("busqueda", value);
    const filtrosActuales = this.obtenerFiltros();
  }
  get ingredientesFiltrados() {
    const query = this.searchI.toLowerCase().trim();
    if (!query) return this.ingredientes; // Si está vacío, muestra todos
    return this.ingredientes.filter(i => 
      i.nombre.toLowerCase().includes(query)
    );
  }

  get etiquetasFiltradas() {
    const query = this.searchE.toLowerCase().trim();
    if (!query) return this.etiquetas; // Si está vacío, muestra todas
    return this.etiquetas.filter(e => 
      e.nombre.toLowerCase().includes(query)
    );
  }
  removerIngrediente(ing: IngredienteFiltro) {
    ing.selected = false;
  }
  removerEtiqueta(tag: EtiquetaFiltro) {
    tag.selected = false;
  }
  esValido(): boolean{
    const hayIngredientes = this.ingredientes.some(i => i.selected);
    const hayEtiquetas = this.etiquetas.some(e => e.selected);

    return this.nuevaReceta.titulo.trim() !== '' &&
      this.nuevaReceta.descripcion.trim() !== '' &&
      this.nuevaReceta.porciones > 0 &&
      this.nuevaReceta.tiempoPreparacion > 0 &&
      this.nuevaReceta.dificultad >= 1 && this.nuevaReceta.dificultad <= 3 &&
      hayIngredientes &&
      hayEtiquetas &&
      this.pasos.length > 0;
  }
  crearReceta() {
    if (!this.esValido()) {
      alert("Completa todos los campos");
      return;
    }

    this.recetaService.postReceta(this.nuevaReceta).subscribe((res: any) => {

      const recetaId = res?.id;

      if (!recetaId || recetaId <= 0) {
        alert("Error: no se pudo obtener el ID de la receta");
        return;
      }

      const ingredientes = this.ingredientes.filter(i => i.selected);
      const etiquetas = this.etiquetas.filter(e => e.selected);
      const ingredientesInvalidos = ingredientes.some(i =>
        !i.cantidad || i.cantidad <= 0 || !i.unidad.trim()
      );

      if (ingredientesInvalidos) {
        alert("Todos los ingredientes deben tener cantidad y unidad");
        return;
      }
      const requests = [

       ...ingredientes.map(i =>
        this.recetaIngredienteService.postRecetaIngrediente({
          receta: recetaId,
          ingrediente: i.id,
          cantidad: i.cantidad,
          unidad: i.unidad,
        })
      ),

        ...etiquetas.map(e =>
          this.recetaEtiquetaService.postRecetaEtiqueta({
            receta: recetaId,
            etiqueta: e.id
          })
        ),

       ...this.pasos.map(p =>
            this.pasoService.postPaso({
              id: 0,
              descripcion: p.descripcion,
              numero: p.numero,
              receta: recetaId
            })
          )
        ];

      if (requests.length === 0) {
        alert("No hay datos para guardar");
        return;
      }

      forkJoin(requests).subscribe({
        next: () => {
          alert("Receta creada con éxito");
          this.resetFormulario();
        },
        error: () => {
          alert("Error al guardar la receta");
        }
      });

    });
  }
  resetFormulario() {
    this.nuevaReceta = {
      id: 0,
      likes: 0,
      usuarioId: Number(localStorage.getItem("userId")),
      autor: '',
      titulo: '',
      descripcion: '',
      porciones: 0,
      tiempoPreparacion: 0,
      dificultad: 1
    };
    this.deselectI();
    this.deselectE();
    this.pasos = [];
  }
  agregarPaso() {
  this.pasos.push({
    id: 0,
    receta: 0,
    descripcion: '',
    numero: this.pasos.length + 1
  });
}

eliminarPaso(index: number) {
  this.pasos.splice(index, 1);

  // Reordenar pasos (importante)
  this.pasos.forEach((p, i) => {
    p.numero = i + 1;
  });
}
}
