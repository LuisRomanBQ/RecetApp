import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'https://www.recetapp.somee.com/usuario'
  constructor(private client: HttpClient){}

  getUsuarios(){
    return this.client.get<Usuario[]>(this.apiUrl)
  }
  postUsuario(nuevo:Usuario){
    return this.client.post(this.apiUrl,nuevo)
  }
  putUsuario(nuevo:Usuario){
    return this.client.put(this.apiUrl,nuevo)
  }
  deleteUsuario(id:number){
    let route = this.apiUrl + '/' + id;
    return this.client.delete(route)
  }
  getById(id:number):Observable<Usuario>{
    let route = this.apiUrl + '/' + id;
    return this.client.get<Usuario>(route)
  }
}
