import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecetaIngrediente } from '../models/RecetaIngrediente';

@Injectable({
  providedIn: 'root',
})
export class RecetaIngredienteService {
  private apiUrl = 'https://www.RecetApp.somee.com/RecetaIngrediente'
  constructor(private client: HttpClient){}

  getRecetaIngredientes(receta: number){
    return this.client.get<RecetaIngrediente[]>(this.apiUrl)
  }
  postRecetaIngrediente(nuevo:RecetaIngrediente){
    return this.client.post(this.apiUrl,nuevo)
  }
  putRecetaIngrediente(nuevo:RecetaIngrediente){
    return this.client.put(this.apiUrl,nuevo)
  }
  deleteRecetaIngrediente(receta:number, id:number){
    let route = this.apiUrl + '/' + receta + '/' + id;
    return this.client.delete(route)
  }
}
