export interface Comentario{
    id: number;
    usuarioId: number;
    receta: number;
    texto: string;
    fecha: Date;
}
export interface ComentarioAutor extends Comentario{
    autor: string;
}