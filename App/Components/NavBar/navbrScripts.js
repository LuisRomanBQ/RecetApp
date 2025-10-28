const homebtn = document.getElementById("homebtn");
const menubtn = document.getElementById("menubtn");
const shoppingbtn = document.getElementById("shoppingbtn");
const uploadbtn = document.getElementById("uploadbtn");
const profilebtn = document.getElementById("profilebtn");

function CambiarRuta(ruta){

    const mainFrame = parent.document.getElementById("mainFrame");
    mainFrame.src = ruta;
}

homebtn.addEventListener("click", ()=> CambiarRuta("Pages/Home/home.html"));
menubtn.addEventListener("click", ()=> CambiarRuta("Pages/Menu/menu.html"));
shoppingbtn.addEventListener("click", ()=> CambiarRuta("Pages/Checklist/checklist.html"));
uploadbtn.addEventListener("click", ()=> CambiarRuta("Pages/Upload/upload.html"));
profilebtn.addEventListener("click", ()=> CambiarRuta("Pages/Profile/profile.html"));
