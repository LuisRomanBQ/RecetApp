import { Injectable } from '@angular/core';
import { RecetaService } from './receta-service';
import { UsuarioService } from './usuario-service';
import { PasoService } from './paso-service';
import { RecetaIngredienteService } from './rec-ing-service';
import { RecIngSusService } from './rec-ing-sus-service';
import { IngredienteService } from './ingrediente-service';
import { ComentarioService } from './comentario-service';
import { RecetaCompleta } from '../models/RecetaFull';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeDataAgg {
  constructor(
    private recetaService: RecetaService,
    private usuarioService: UsuarioService,
    private pasoService: PasoService,
    private recIngService: RecetaIngredienteService,
    private recIngSusService: RecIngSusService,
    private ingredienteService: IngredienteService,
    private comentarioService: ComentarioService
  ) {}

  getRecetaCompleta(recetaId: number): Observable<RecetaCompleta> {
    return this.recetaService.getById(recetaId).pipe(
      switchMap(receta => {
        return forkJoin({
          autor: this.usuarioService.getById(receta.usuarioId),
          pasos: this.pasoService.getPasos(recetaId),
          relacionesIng: this.recIngService.getRecetaIngredientes(recetaId),
          todosLosIngredientes: this.ingredienteService.getIngredientes(),
          // Traemos todos los usuarios para poner nombre a los comentarios
          todosLosUsuarios: this.usuarioService.getUsuarios(), 
          comentarios: this.comentarioService.getComentarios(recetaId)
        }).pipe(
          switchMap(data => {
            // 1. MAPEAMOS COMENTARIOS (Usando la lista de todos los usuarios)
            const comentariosProcesados = data.comentarios.map(c => ({
              ...c,
              autor: data.todosLosUsuarios.find(u => u.id === c.usuarioId)?.nombre || 'Usuario Anónimo'
            }));

            // 2. MAPEAMOS INGREDIENTES Y SUS SUSTITUTOS
            const ingredientesConSustitutos$ = data.relacionesIng.map(rel => {
              // IMPORTANTE: Verifica si tu interfaz usa 'ingrediente' o 'ingredienteId'
              const idIngrediente = rel.ingrediente || (rel as any).ingredienteId;
              
              if (!idIngrediente) {
                console.error('No se encontró ID de ingrediente en la relación:', rel);
                return of({ 
                   nombre: 'Error', cantidad: rel.cantidad, unidad: rel.unidad, sustitutos: [] 
                });
              }

              const nombreIng = data.todosLosIngredientes.find(i => i.id === idIngrediente)?.nombre || 'Desconocido';

              return this.recIngSusService.getRecIngSus(recetaId, idIngrediente).pipe(
                map(sustitutosRel => ({
                  ingredienteId: idIngrediente,
                  nombre: nombreIng,
                  cantidad: rel.cantidad,
                  unidad: rel.unidad,
                  sustitutos: sustitutosRel.map(s => {
                     // s.sustituto es el ID del ingrediente que funciona como reemplazo
                     return s.nombre || 'Sustituto';
                  })
                }))
              );
            });

            const obsIngredientes = ingredientesConSustitutos$.length > 0 
              ? forkJoin(ingredientesConSustitutos$) 
              : of([]);

            return obsIngredientes.pipe(
              map(ingredientesMapeados => ({
                ...receta,
                nombreAutor: data.autor.nombre,
                pasos: data.pasos.sort((a, b) => a.numero - b.numero),
                ingredientes: ingredientesMapeados,
                comentarios: comentariosProcesados // <--- ASIGNADOS AQUÍ
              } as RecetaCompleta))
            );
          })
        );
      })
    );
  }
}
