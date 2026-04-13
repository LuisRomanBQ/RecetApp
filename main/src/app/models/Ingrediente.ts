export interface Ingrediente{
    id: number;
    nombre: string;
}
export interface IngredienteFiltro extends Ingrediente{
    selected: boolean;
}
export interface IngredienteUI extends IngredienteFiltro {
  cantidad: number | 0;
  unidad: string;
  sustituto: boolean | false;
}