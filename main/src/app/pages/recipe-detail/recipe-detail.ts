import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecetaCompleta } from '../../models/RecetaCompleta';
import { RecipeDataAgg } from '../../services/recipe-data-agg';
import { ComentarioService } from '../../services/comentario-service';
import { Comentario, ComentarioAutor } from '../../models/Comentario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  recipe: RecetaCompleta | null = null;
  loading: boolean = true;
  nuevoComentarioTexto: string = '';

  constructor(
    private route: ActivatedRoute,
    private aggregator: RecipeDataAgg,
    private router: Router,
    private comentarioService:ComentarioService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.aggregator.getRecetaCompleta(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.loading = false;
        this.cd.detectChanges();
        console.log(this.recipe)
      },
      error: () => this.router.navigate(['/app/inicio'])
    });
  }
  publicarComentario() {
  if (!this.nuevoComentarioTexto.trim() || !this.recipe) return;
  const textoParaComentar = this.nuevoComentarioTexto;
  const comentarioData:Comentario = {
    id:0,
    recetaId: this.recipe.id,
    usuarioId: Number(localStorage.getItem("userId")), 
    texto: this.nuevoComentarioTexto,
    fecha: new Date()
  };

  this.comentarioService.postComentario(comentarioData).subscribe({
    next: () => {
      const comentarioVisual:ComentarioAutor = {
        id:0,
        usuarioId: Number(localStorage.getItem("userId")),
        recetaId: this.recipe!.id,
        autor: 'Yo',
        texto: textoParaComentar,
        fecha: new Date()
      };
      this.recipe?.comentarios.unshift(comentarioVisual);
      this.nuevoComentarioTexto = '';
      this.cd.detectChanges();
  }});
  this.nuevoComentarioTexto = '';
}

  regresar() {
    this.router.navigate(["/app/inicio"]);
  }
}