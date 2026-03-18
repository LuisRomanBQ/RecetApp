import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecetaEtiqueta } from '../models/RecetaEtiqueta';

@Injectable({
  providedIn: 'root',
})
export class RecetaEtiquetaService {
  private apiUrl = 'https://www.RecetApp.somee.com/RecetaEtiqueta'
  constructor(private client: HttpClient){}

  postRecetaEtiqueta(nuevo:RecetaEtiqueta){
    return this.client.post(this.apiUrl,nuevo)
  }
  deleteRecetaEtiqueta(receta:number, id:number){
    let route = this.apiUrl + '/' + receta + '/' + id;
    return this.client.delete(route)
  }
}
