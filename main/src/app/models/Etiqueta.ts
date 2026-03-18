export interface Etiqueta{
    id: number;
    nombre: string;
}
export interface EtiquetaFiltro extends Etiqueta {
  selected: boolean;
}