import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paso } from '../models/Paso';

@Injectable({
  providedIn: 'root',
})
export class PasoService {
  private apiUrl = 'https://www.RecetApp.somee.com/Paso'
  constructor(private client: HttpClient){}

  getPasos(receta:number){
    return this.client.get<Paso[]>(this.apiUrl)
  }
  postPaso(nuevo:Paso){
    return this.client.post(this.apiUrl,nuevo)
  }
  putPaso(nuevo:Paso){
    return this.client.put(this.apiUrl,nuevo)
  }
  deletePaso(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.delete(route)
  }
}
