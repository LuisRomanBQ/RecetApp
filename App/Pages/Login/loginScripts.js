let email = document.getElementById("email");
let password = document.getElementById("contraseña");

const loginbtn = document.getElementById("loginbtn");

loginbtn.addEventListener("click", () =>{
    
    if(BuscarEmail() && validarPassword()){
        alert("Inicio de sesión Exitoso");
        window.location.href = "/Index.html";
    }
    else{
        alert("Usuario/Contraseña Incorrectos");
    }
});
function BuscarEmail(){
    return email.value == "admin@gmail.com";
}
function validarPassword(){
    return password.value =="pass123";
}