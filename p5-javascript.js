
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
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
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
        teddyId.textContent = dataTeddy.id;
        //crétaion de l'élément strong pour le nom des teddys :
        let teddyName = document.createElement("strong");
        teddyName.textContent = dataTeddy.name;
        teddyName.style.color = "darkblue";
        teddyName.style.fontSyze = "25px";
        //création de l'élémnet img pour l'image :
        let teddyImg = document.createElement("img");
        teddyImg.src = dataTeddy.imageUrl;
        teddyImg.style.width = "200px";
        teddyImg.style.paddingLeft = "90px";

        let brElt = document.createElement("br");
        //on ajoute tous les éléments récupérés au contener :
        contenerElt.appendChild(teddyId);
        contenerElt.appendChild(teddyName);
        contenerElt.appendChild(brElt);
        contenerElt.appendChild(teddyImg);
        //on ajoute le contener a l'élément html :
        listDatasElt.appendChild(contenerElt);
    });
});
//recuperation des données du serveur pour la page produits :
//pour ajouter une classe : 'elt.classList.add("class");'
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    let listDatasElt = document.getElementById("affichageListeTeddy");
    //transforme la reponse en objet javascript
    let datas = JSON.parse(reponse);
    //Affichage
    datas.forEach(function(dataTeddy){
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

        let teddyDescription = document.createElement("p");
        teddyDescription.textContent = dataTeddy.description;

        let teddyImg = document.createElement("img");
        teddyImg.src = dataTeddy.imageUrl;
        teddyImg.style.width = "200px";
        teddyImg.style.paddingLeft = "90px";
        //creation element boutton au produit :
        let btnElt = document.createElement("button");
        btnElt.textContent = "Ajouter au panier";
        btnElt.classList.add('button-add');
        btnElt.style.marginTop = "20px";
        btnElt.addEventListener("click", ajouterAuPanier);

        let brElt = document.createElement("br");
        //on ajoute tous les éléments créé au conteneur :
        contenerElt.appendChild(teddyId);
        contenerElt.appendChild(teddyName);
        contenerElt.appendChild(teddyPrice);
        contenerElt.appendChild(teddyDescription);
        contenerElt.appendChild(teddyImg);
        contenerElt.appendChild(btnElt);
        contenerElt.appendChild(brElt);
        //on ajoute le contener à l'élémnet html :
        listDatasElt.appendChild(contenerElt);
    });
});



function ajouterAuPanier(){
    ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
        let elementAdd = document.getElementById("addPanier");
        //transforme la reponse en objet javascript
        elementAdd = JSON.parse(reponse);

        let contenerElt = document.createElement("div");
        contenerElt.classList.add("article");

        let teddyId = document.createElement("id");
            teddyId.textContent = dataTeddy.id;

       /* let teddyName = document.createElement("strong");
        teddyName.textContent = dataTeddy.name;
        teddyName.style.color = "darkblue";
        teddyName.style.fontSyze = "20px";

        let teddyPrice = document.createElement("p");
        teddyPrice.textContent = dataTeddy.price + "€";

        let teddyImg = document.createElement("img");
        teddyImg.src = dataTeddy.imageUrl;
        teddyImg.style.width = "200px";
        teddyImg.style.paddingLeft = "90px";*/
        //on ajoute tous les éléments créés au contener :
        contenerElt.appendChild("teddyId");
        contenerElt.appendChild("teddyName");
        /* contenerElt.appendChild("teddyPrice");
        contenerElt.appendChild("teddyImg");*/
        //on ajoute le contener al 'élément de la pge html :
        elementAdd.appendChild(contenerElt);
    });
    alert("ajouter a panier");
}
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
