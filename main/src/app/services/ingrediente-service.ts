import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/Ingrediente';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  private apiUrl = 'https://www.RecetApp.somee.com/Ingrediente'
  constructor(private client: HttpClient){}

  getIngredientes(){
    return this.client.get<Ingrediente[]>(this.apiUrl)
  }
  postIngrediente(nuevo:Ingrediente){
    return this.client.post(this.apiUrl,nuevo)
  }
  putIngrediente(nuevo:Ingrediente){
    return this.client.put(this.apiUrl,nuevo)
  }
  deleteIngrediente(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.delete(route)
  }
  getById(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.get(route)
  }
}
