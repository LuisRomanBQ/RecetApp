import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecetaIngredienteSustituto } from '../models/RecetaIngredienteSustituto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecIngSusService {
  private apiUrl = 'https://www.RecetApp.somee.com/RecetaIngredienteSustituto'
  constructor(private client: HttpClient){}

  getRecIngSus(receta:number, ingrediente:number):Observable<RecetaIngredienteSustituto[]>{
    return this.client.get<RecetaIngredienteSustituto[]>(`${this.apiUrl}/${receta}/${ingrediente}`)
  }
  postRecIngSus(nuevo:RecetaIngredienteSustituto){
    return this.client.post(this.apiUrl,nuevo)
  }
  putRecIngSus(nuevo:RecetaIngredienteSustituto){
    return this.client.put(this.apiUrl,nuevo)
  }
  deleteRecIngSus(receta:number, ingrediente:number, id:number){
    let route = this.apiUrl + '/' + receta + '/' + ingrediente + '/' + id;
    return this.client.delete(route)
  }
}
