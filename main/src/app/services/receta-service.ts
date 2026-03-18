import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receta } from '../models/Receta';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private apiUrl = 'https://www.recetapp.somee.com/Receta'
  constructor(private client: HttpClient){}

  getRecetas(){
    return this.client.get<Receta[]>(this.apiUrl)
  }
  postReceta(nuevo:Receta){
    return this.client.post(this.apiUrl,nuevo)
  }
  putReceta(nuevo:Receta){
    return this.client.put(this.apiUrl,nuevo)
  }
  deleteReceta(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.delete(route)
  }
  getById(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.get(route)
  }
  getByIngredientes(ingredientes:string){
    let route = this.apiUrl + '/por-ingredientes/' + ingredientes;
    return this.client.get(route)
  }
  getbyEtiquetas(etiquetas:string){
    let route = this.apiUrl + '/por-etiqueta/' + etiquetas;
    return this.client.get(route)
  }
  getByIngredientesEx(ingredientes:string){
    let route = this.apiUrl + '/por-ingredientes-exactos/' + ingredientes;
    return this.client.get(route)
  }
  getByIngredientesCon(ingredientes:string){
    let route = this.apiUrl + '/con-ingredientes/' + ingredientes;
    return this.client.get(route)
  }
}
