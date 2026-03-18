import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etiqueta } from '../models/Etiqueta';

@Injectable({
  providedIn: 'root',
})
export class EtiquetaService {
  private apiUrl = 'https://www.recetapp.somee.com/Etiqueta'
  constructor(private client: HttpClient){}

  getEtiquetas(){
    return this.client.get<Etiqueta[]>(this.apiUrl)
  }
  postEtiqueta(nuevo:Etiqueta){
    return this.client.post(this.apiUrl,nuevo)
  }
  putEtiqueta(nuevo:Etiqueta){
    return this.client.put(this.apiUrl,nuevo)
  }
  deleteEtiqueta(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.delete(route)
  }
  getById(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.get(route)
  }
}
