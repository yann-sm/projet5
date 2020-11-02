
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
    //datas.forEach(function(dataTeddy){
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
   // });
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
