const homebtn = document.getElementById("homebtn");
const menubtn = document.getElementById("menubtn");
const shoppingbtn = document.getElementById("shoppingbtn");
const uploadbtn = document.getElementById("uploadbtn");
const profilebtn = document.getElementById("profilebtn");

function CambiarRuta(ruta){
    const mainFrame = parent.document.getElementById("mainFrame");
    mainFrame.src = ruta;
}

homebtn.addEventListener("click", ()=> CambiarRuta("App/Pages/Home/home.html"));
menubtn.addEventListener("click", ()=> CambiarRuta("App/Pages/Menu/menu.html"));
shoppingbtn.addEventListener("click", ()=> CambiarRuta("App/Pages/Checklist/checklist.html"));
uploadbtn.addEventListener("click", ()=> CambiarRuta("App/Pages/Upload/upload.html"));
profilebtn.addEventListener("click", ()=> CambiarRuta("App/Pages/Profile/profile.html"));
