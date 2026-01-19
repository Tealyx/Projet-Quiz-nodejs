//Fichier JS pour le front end


const btn_page_installation = document.getElementById("btn_page_installation");
btn_page_installation.addEventListener("click",function(){
    //A faire
});


const btn_activation_structure_page=document.getElementById("btn_activation_structure_page"); //Je récupère l'élément identifié par l'ID "btn_activation_structure_page" et le stocke dans la constante "btn_activation_structure_page".
btn_activation_structure_page.addEventListener("click",function(){ //J'ajoute à l'élément un mouchard qui écoute si quelqu'un "click" sur l'élément. Si le mouchard détecte un "click", alors la fonction "function" est éxecuté.
    console.log("Un click a été détecté sur le bouton : 'btn_activation_structure_page'")
    const Header = document.getElementById("Header")
    Header.style.border="2px solid black"
});