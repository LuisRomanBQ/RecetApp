import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario-service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  imports: [CommonModule,RouterModule],
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit{
  usuario?:Usuario;

  //inyeccion de dependencias
  constructor(private usuarioService:UsuarioService, private cd: ChangeDetectorRef, private router:Router){
  }
  ngOnInit(): void {
    const id = Number(localStorage.getItem("userId"))
    this.usuarioService.getById(id).subscribe((data:any)=>{
      this.usuario = data;
      this.cd.detectChanges();
    });
  }
  logOut(){
    localStorage.removeItem("userId");
    alert("Sesión cerrada correctamente");
    this.router.navigate(["/inicio Sesion"])
  }

  
}
