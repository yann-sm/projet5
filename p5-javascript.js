
// Appel ajax get/post générique -
// recuperer les données d'un serveur - ok!
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

// Exécute un appel AJAX POST -
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
// Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON
function ajaxPost(url, data, callback, isJson) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    if (isJson) {
        // Définit le contenu de la requête comme étant du JSON
        req.setRequestHeader("Content-Type", "application/json");
        // Transforme la donnée du format JSON vers le format texte avant l'envoi
        data = JSON.stringify(data);
    }
    req.send(data);
}

//recuperation uniquement du nom et de l'image pour la page d'acceuil :
ajaxGet("http://localhost:3000/api/teddies/", function (reponse) {
    let listDatasElt = document.getElementById("nosTeddy");
    //transforme la reponse en objet javascript
    let datas = JSON.parse(reponse);
    //Affichage
    datas.forEach(function(dataTeddy){
        // création d'un élément div servant de contener :
        let contenerElt = document.createElement("div");
        contenerElt.classList.add('article');
        //création de l'élément id :
        let teddyId = document.createElement("id");
        teddyId.id = dataTeddy._id;
        //crétaion de l'élément strong pour le nom des teddys :
        let teddyName = document.createElement("strong");
        teddyName.textContent = dataTeddy.name;
        teddyName.style.color = "darkblue";
        teddyName.style.fontSyze = "25px";
        //création de l'élémnet img pour l'image :
        let teddyImg = document.createElement("img");
        teddyImg.src = dataTeddy.imageUrl;
        //teddyImg.setAttribute("src", dataTeddy.imageUrl);
        teddyImg.setAttribute("alt", "Photo de" + dataTeddy.name);
        teddyImg.setAttribute("title", "Photo de" + dataTeddy.name);
        teddyImg.style.width = "200px";
        teddyImg.style.paddingLeft = "90px";

        let teddyLien = document.createElement("a");
        teddyLien.textContent = "voire description";
        teddyLien.setAttribute("href", "produits.html?id=" + dataTeddy._id);

        let brElt = document.createElement("br");
        //on ajoute tous les éléments récupérés au contener :
        contenerElt.appendChild(teddyId);
        contenerElt.appendChild(teddyName);
        contenerElt.appendChild(brElt);
        contenerElt.appendChild(teddyImg);
        contenerElt.appendChild(teddyLien);
        //on ajoute le contener a l'élément html :
        listDatasElt.appendChild(contenerElt);
    });
});

let idTeddy = ""; 
//recuperation des données du serveur pour la page produits :
//pour ajouter une classe : 'elt.classList.add("class");'
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    idTeddy = location.search.substring(4);
    let listDatasElt = document.getElementById("affichageListeTeddy");
    //transforme la reponse en objet javascript
    let datas = JSON.parse(reponse);
    //Affichage
    datas.forEach(function(dataTeddy){
        let contenerElt = document.createElement("div");
        contenerElt.classList.add("article");

        let teddyId = document.createElement("id");
        teddyId.id = dataTeddy._id;

        let teddyName = document.createElement("strong");
        teddyName.textContent = dataTeddy.name;
        teddyName.style.color = "darkblue";
        teddyName.style.fontSyze = "20px";

        let teddyPrice = document.createElement("p");
        teddyPrice.textContent = dataTeddy.price + "€";

        let teddyDescription = document.createElement("p");
        teddyDescription.textContent = dataTeddy.description;

        let teddyImg = document.createElement("img");
        teddyImg.src = dataTeddy.imageUrl;
        teddyImg.style.width = "200px";
        teddyImg.style.paddingLeft = "90px";

        //creation du choix des couleurs :
        //création de l'élément seleect :
        let teddyColors = document.createElement('select');
        //création des élément options contenant les différentes couleurs :
        let teddyColorsOption1 = document.createElement('option');
        teddyColorsOption1.textContent = dataTeddy.colors[0];
        let teddyColorsOption2 = document.createElement('option');
        teddyColorsOption2.textContent = dataTeddy.colors[1];
        let teddyColorsOption3 = document.createElement('option');
        teddyColorsOption3.textContent = dataTeddy.colors[2];
        let teddyColorsOption4 = document.createElement('option');
        teddyColorsOption4.textContent = dataTeddy.colors[3];
        //ajout de toutes les option à l'élément select :
        teddyColors.appendChild(teddyColorsOption1);
        teddyColors.appendChild(teddyColorsOption2);
        teddyColors.appendChild(teddyColorsOption3);
        teddyColors.appendChild(teddyColorsOption4);
        //creation element boutton au produit :
        let btnElt = document.createElement("button");
        btnElt.textContent = "Ajouter au panier";
        btnElt.classList.add('button-add');
        btnElt.style.marginTop = "20px";
        //btnElt.addEventListener("click", ajouterAuPanier);
        btnElt.addEventListener("click", async function(){
            //ajout de l'article au panier du client :
            const ajout = ajaxGet("http://localhost:3000/api/teddies", function () {
                panier.push(ajout);
                localStorage.setItem("panier", JSON.stringify(panier));
                alert("le produit a bien été ajouté au panier");
                location.reload();
            });
            
        });
        //création d'un élément br :
        let brElt = document.createElement("br");
        //on ajoute tous les éléments créé au conteneur :
        contenerElt.appendChild(teddyId);
        contenerElt.appendChild(teddyName);
        contenerElt.appendChild(teddyPrice);
        contenerElt.appendChild(teddyDescription);
        contenerElt.appendChild(teddyImg);
        contenerElt.appendChild(teddyColors);
        contenerElt.appendChild(btnElt);
        contenerElt.appendChild(brElt);
        //on ajoute le contener à l'élémnet html :
        listDatasElt.appendChild(contenerElt);
    });
});


/*function ajouterAuPanier() {
    ajaxGet("http://localhost:3000/api/teddies",function (reponse) {
        let listDatasIdElt = document.getElementById("addPanier");
        let dataTeddy = JSON.parse(reponse);
        let contenerElt = document.createElement("div");
        contenerElt.classList.add("article");
        let teddyId = document.createElement("id");
        teddyId.id = dataTeddy.id;
        let teddyName = document.createElement("strong");
        teddyName.textContent = dataTeddy.name;
        teddyName.style.color = "darkblue";
        teddyName.style.fontSyze = "20px";

        contenerElt.appendChild(teddyId);
        contenerElt.appendChild(teddyName);
        listDatasIdElt.appendChild(contenerElt);
        
    });
   alert("élément ajouté...");
}*/
/*
// ------------------- init panier ---------------------
//création du panier de l'utilisateur :
let panier = JSON.parse(localStorage.getItem("panier"));
//affichage du nombre d'article dans le panier :
function nombreDeTeddy(){
    let nbTeddy = document.getElementById("nbPanier");
    nbTeddy.textContent = panier.length;
}

function produitsPanier(){
    let produitsPanier = document.getElementById("produitPanier");
    produitsPanier.textContent = panier.length;
}
/*
*/
/*
//verif et initialisation du panier :
if(localStorage.getItem("panier")){
    console.log(panier);
}else{
    console.log("Le panier est initialisé");
    let panierInit = [];
    localStorage.setItem("panier", JSON.stringify(panierInit));
}

//affichage page panier.html :
creationPanier = () => {
    if(panier.length > 0){
        document.getElementById("panierVide").remove();
    }

    //tableau recapitulatif de commande :
    let recapPanier = document.getElementById("recapPanier");
    
    let recap = document.createElement("table");
    recapPanier.appendChild(recap);
    
    let ligneTab = document.createElement("tr");
    recap.appendChild(ligneTab);

    let recapImg = document.createElement("th");
    recapImg.textContent = "Teddy";
    ligneTab.appendChild(recapImg);

    let recapName = document.createElement("th");
    recapName.textContent = "Nom";
    ligneTab.appendChild(recapName);

    let recapPrix = document.createElement("th");
    recapPrix.textContent = "Prix";
    ligneTab.appendChild(recapPrix);

    let recapSupp = document.createElement("th");
    recapSupp.textContent = "Supprimer";
    ligneTab.appendChild(recapSupp);

    let ligneTotal = document.createElement("tr");
    let colTotal = document.createElement("th");
    let recapPrix = document.createElement("td"); 

    //boucle for pour affichage dans le panier :
    for( let i = 0; i < panier.length; i++){
        //création des lignes du tableau :
        let lignearticle = document.createElement("tr");
        lignearticle.setAttribute("id", "article");
        let imgArticle = document.createElement("img");
        imgArticle.setAttribute("src", panier[i].imageUrl);
        let nomArticle = document.createElement("td");
        let prixArticle = document.createElement("td");
        let supprimerArticle = document.createElement("td");
        let removeArticle = document.createElement("i");
        removeArticle.setAttribute("id", "remove");

        //supprimer le produit du panier :
        removeArticle.addEventListener("click", (event) => {this.annulerArticle(i);})
    }
}



/*
function ajouterAuPanier(){
        ajaxGet("http://localhost:3000/api/teddies", function (reponse){
           let dataTeddy = JSON.parse(reponse);
           // datas.for(function(dataTeddy){
                let contenerElt = document.createElement("div");
                contenerElt.classList.add("article");

                let teddyId = document.createElement("id");
                teddyId.textContent = dataTeddy.id;

                let teddyName = document.createElement("strong");
                teddyName.textContent = dataTeddy.name;
                teddyName.style.color = "darkblue";
                teddyName.style.fontSyze = "20px";
                let teddyImg = document.createElement("img");
                teddyImg.src = dataTeddy.imageUrl;

                contenerElt.appendChild(teddyId);
                contenerElt.appendChild(teddyName);
                contenerElt.appendChild(teddyImg);

                document.getElementById("addPanier").appendChild(contenerElt);
                alert("Réussi....")
            //});*/
/*      });

}*/
/*
function ajouterAuPanier(){
    ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
        let elementAdd = document.getElementById("addPanier");
        //transforme la reponse en objet javascript
        let dataTeddy = JSON.parse(reponse);

       // teddyAdd.forEach(function(dataTeddy){

            let contenerElt = document.createElement("div");
            contenerElt.classList.add("article");

            let teddyId = document.createElement("id");
            teddyId.textContent = dataTeddy.id;
            
            let teddyName = document.createElement("strong");
            teddyName.textContent = dataTeddy.name;
            teddyName.style.color = "darkblue";
            teddyName.style.fontSyze = "20px";

            let teddyPrice = document.createElement("p");
            teddyPrice.textContent = dataTeddy.price + "€";

            let teddyImg = document.createElement("img");
            teddyImg.src = dataTeddy.imageUrl;
            teddyImg.style.width = "200px";
            teddyImg.style.paddingLeft = "90px";
            alert("ajouter a panier");
            //on ajoute tous les éléments créés au contener :
            contenerElt.appendChild(teddyId);
            contenerElt.appendChild(teddyName);
            contenerElt.appendChild(teddyPrice);
            contenerElt.appendChild(teddyImg);
            //on ajoute le contener al 'élément de la pge html :
            elementAdd.appendChild(contenerElt);
           
        //});
         
    });
    
}  /*

/* peut être initialiser un panier ???? :
//Vérification et initialisation du panier
if (localStorage.getItem("panier")) {
    console.log(panier);
} else {
    console.log("Le panier va être initalisé");
    let panierInit = [];
    localStorage.setItem("panier", JSON.stringify(panierInit));
}
*/


  /*  //on créé différent elements :
    let contenerElt = document.createElement('div');
    contenerElt.style.textAlign = "center";

    let nomTeddyElt = document.createElement('h3');

    let supElt = document.createElement('span');
    supElt.style.color = "red";
    supElt.style.cursor = "pointer";
    supElt.addEventListener("click", supprimerDuPanier);
    //fonction pour supprimer du panier :
    function supprimerDuPanier(){
        contenerElt.remove();
    }

    let imgTeddyElt = document.createElement('img');
    imgTeddyElt.style.width = "200px";


    let priceElt = document.createElement('p');
    
    //on leur ajoute un contenu :
    nomTeddyElt.textContent = "nom du Teddy";
    supElt.textContent = 'X';
    imgTeddyElt.src = "images/teddy_1.jpg";
    priceElt.textContent = "prix du teddy" + "€";
   
    //on ajoute les differents elements à l'element contenerElt :
    contenerElt.appendChild(supElt);
    contenerElt.appendChild(nomTeddyElt);
    contenerElt.appendChild(imgTeddyElt);
    contenerElt.appendChild(priceElt);
    
    document.getElementById("addPanier").appendChild(contenerElt);

    //requete pour envoyer sur un serveur
    //ajaxPost("http://localhost:3000", data, function () {});
}
*/



// Pour le formulaire :
/* Gérer la soumission d'un formulaire avec FormData : *//*
var form = document.querySelector("form");
//gestion de la soumission du formulaire
form.addEventListener("submit" function(e) {
    e.preventDefault();
    //recuperation des champs du formulaire dans l'objet FormData
    var data = new FormData(form);
    //envoie des données du formulaire au serveur
    //la fonction callback est ici vide
    ajaxPost("http://localhost:3000/api/teddies", data, function(){});
});
*/