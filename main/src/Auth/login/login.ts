import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { UsuarioService } from '../../app/services/usuario-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = "";
  contrasena = "";

  constructor(private router: Router, private usuarioService: UsuarioService){}
  iniciarSesion(){

  this.usuarioService.getUsuarios()
  .subscribe((usuarios)=>{

    const usuarioEncontrado = usuarios.find(u =>
      u.correo === this.correo &&
      u.contrasena === this.contrasena
    );

    if(usuarioEncontrado){

      localStorage.setItem("userId", usuarioEncontrado.id.toString());

      this.router.navigate(['/app/inicio']);

    }
    else{
      alert("Correo o contraseña incorrectos");
    }
    });
  }
}
