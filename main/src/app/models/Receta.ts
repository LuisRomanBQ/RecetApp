export interface Receta{
    id: number,
    titulo: string;
    descripcion: string;
    tiempoPreparacion: number;
    dificultad: number;
    likes: number;
    porciones: number;
    usuarioId: number;
    autor: string
}