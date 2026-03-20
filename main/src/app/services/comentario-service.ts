import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario, ComentarioAutor } from '../models/Comentario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private apiUrl = 'https://www.recetapp.somee.com/Comentario'
  constructor(private client: HttpClient){}

  getComentarios(receta:number):Observable<ComentarioAutor[]>{
    let route = this.apiUrl + '/por-receta/' + receta;
    return this.client.get<ComentarioAutor[]>(route)
  }
  postComentario(nuevo:Comentario){
    return this.client.post(this.apiUrl,nuevo)
  }
  putComentario(nuevo:Comentario){
    return this.client.put(this.apiUrl,nuevo)
  }
  deleteComentario(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.delete(route)
  }
  getById(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.get(route)
  }
}

