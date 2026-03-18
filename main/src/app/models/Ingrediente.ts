export interface Ingrediente{
    id: number;
    nombre: string;
}
export interface IngredienteFiltro extends Ingrediente{
    selected: boolean;
}