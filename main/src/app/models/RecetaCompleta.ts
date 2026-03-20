import { Comentario, ComentarioAutor } from "./Comentario";
import { Paso } from "./Paso";
import { Receta } from "./Receta";

export interface RecetaCompleta extends Receta {
  nombreAutor: string;
  pasos: Paso[];
  ingredientes: {
    ingredienteId: number;
    nombre: string;
    cantidad: number;
    unidad: string;
    sustitutos: string[]; // Nombres de los sustitutos
  }[];
  comentarios: ComentarioAutor[];
}