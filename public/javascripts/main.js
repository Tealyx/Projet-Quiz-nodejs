//Fichier JS pour le front end


const btn_page_installation = document.getElementById("btn_page_installation");
btn_page_installation.addEventListener("click",function(){
    console.log('appuie sur le bouton page installation')
});


const btn_activation_structure_page=document.getElementById("btn_activation_structure_page"); //Je récupère l'élément identifié par l'ID "btn_activation_structure_page" et le stocke dans la constante "btn_activation_structure_page".
btn_activation_structure_page.addEventListener("click",function(){ //J'ajoute à l'élément un mouchard qui écoute si quelqu'un "click" sur l'élément. Si le mouchard détecte un "click", alors la fonction "function" est éxecuté.
    console.log("Un click a été détecté sur le bouton : 'btn_activation_structure_page'")
    const Header = document.getElementById("Header")
    if (Header.style.border === '2px solid black') { //Deux méthodes pour activer/Désactiver des éléments esthétiques
    Header.style.border = 'none';  // Désactiver la bordure
    Header.style.margin = "none";
    } else {
    Header.style.border = '2px solid black';  // Ou activer la bordure
    Header.style.margin = "3px";
    };
    Header.classList.toggle('show-header-label');
    const Main = document.getElementById("Main");
    Main.classList.toggle('active_borders'); //Deuxième méthode rajouter ou enlever la classe 'active-borders' définie dans le CSS à la liste des classes de l'élément Main.
    Main.classList.toggle('show-main-label')
    const Footer = document.getElementById("Footer");
    Footer.classList.toggle('active_borders')
    Footer.classList.toggle('show-footer-label')
    
});