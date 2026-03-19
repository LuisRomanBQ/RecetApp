import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EtiquetaService } from '../../services/etiqueta-service';
import { Etiqueta, EtiquetaFiltro } from '../../models/Etiqueta';
import { Ingrediente, IngredienteFiltro } from '../../models/Ingrediente';
import { IngredienteService } from '../../services/ingrediente-service';
import { FormsModule } from '@angular/forms';
import { FiltroService } from '../../services/filtro-service';

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
  filterValue: number = 0;
  etiquetas: EtiquetaFiltro[] = [];
  ingredientes: IngredienteFiltro[] = [];
  nombreI = "";
  nombreE = "";
  search: string = localStorage.getItem("busqueda") || '';
  searchE = "";
  searchI = "";
  nuevoI?:Ingrediente;
  nuevoE?:Etiqueta;

  constructor(private etiquetaService: EtiquetaService,
    private ingredienteService:IngredienteService,
    private router:Router, private filtroService:FiltroService
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

    const filtros = this.obtenerFiltros();

    const payload = {
      ...filtros,
      modo: this.filterValue,
      busqueda: this.search
    };

    localStorage.setItem("filtros", JSON.stringify(payload));
    this.filtroService.actualizarFiltros(payload);
    this.router.navigate(["/app/inicio"])
    
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
    this.ingredientes.forEach(i => i.selected = false);
    if (this.filterValue >= 1 && this.filterValue <= 3) {
          this.filterValue = 0;
          localStorage.removeItem("filtros");
    }
  }
  deselectE(){
    this.etiquetas.forEach(e => e.selected = false);
    if (this.filterValue === 4) {
        this.filterValue = 0;
    }
  }
  guardarBusqueda(){
    const value = this.search.trim();
    localStorage.setItem("busqueda", value);
    const filtrosActuales = this.obtenerFiltros();
    this.filtroService.actualizarFiltros({
      ...filtrosActuales,
      modo: this.filterValue,
      busqueda: value
    });
    this.router.navigate(["/app/inicio"])
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
}