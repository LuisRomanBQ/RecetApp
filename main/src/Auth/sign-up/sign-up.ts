import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../app/services/usuario-service';
import { Usuario } from '../../app/models/Usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
nombres = "";
apellidos = "";
correo = "";
contrasena = "";
biografia = "";

constructor(private userService: UsuarioService, private router:Router){}

  validar(): boolean {
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(this.nombres.trim() === "" ||this.apellidos.trim() === "" ||
      this.correo.trim() === "" ||
      this.contrasena.trim() === ""){
        alert("Favor de llenar los campos")
         return false
      }
     
    if(
      !correoValido.test(this.correo) ||
      !soloLetras.test(this.nombres) ||
      !soloLetras.test(this.apellidos)
      ){
        alert("Introduzca datos validos")
        return false;
      }
      return true;
  }
  registrarse(){

  if(!this.validar()){
    alert("Favor de llenar los campos requeridos");
    return;
  }

  const usuario: Usuario = {
    id: 0,
    nombre: this.nombres + " " + this.apellidos,
    correo: this.correo,
    contrasena: this.contrasena,
    biografia: this.biografia
  };
  this.userService.postUsuario(usuario)
  .subscribe(()=>{
    alert("Se ha registrado correctamente");
    this.router.navigate(['/inicioSesion']);
  });
  
}
}
