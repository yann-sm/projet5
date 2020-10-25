
//requête GET pour récupérer les éléments du serveur :
displayAllTeddies = () => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200 && this.status < 400) {
            resolve(JSON.parse(this.responseText));
            console.log("Connecté"); 
        }
        
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + idTeddy);
    request.send();
    });
};

async function teddy(){
    const teddy = await displayAllTeddies();
    //l'élément contener de la page index.html :
    let listDatasElt = document.getElementById("nosTeddy");
    //Affichage
    teddy.forEach((dataTeddy) => {
        // création d'un élément div servant de contener :
        let contenerElt = document.createElement("div");
        contenerElt.classList.add('article');
        //création de l'élément id :
       // let teddyId = document.createElement("id");
       // teddyId.id = dataTeddy._id;
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
        //on fait correspondre la page produits avec l'id du teddy selectinné :
        teddyLien.setAttribute("href", "produits.html?id="+dataTeddy._id);

        let brElt = document.createElement("br");
        //on ajoute tous les éléments récupérés au contener :
       // contenerElt.appendChild(teddyId);
        contenerElt.appendChild(teddyName);
        contenerElt.appendChild(brElt);
        contenerElt.appendChild(teddyImg);
        contenerElt.appendChild(teddyLien);
        //on ajoute le contener a l'élément html :
        listDatasElt.appendChild(contenerElt);
    });
   
}

//affichage page produits :
let idTeddy = "";
async function teddyProduits(){
    idTeddy = location.search.substring(4);
    const teddyProduits = await displayAllTeddies();
    //l'élément contener de la page produits.html :
    let listDatasElt = document.getElementById("affichageListeTeddy");
    //Affichage :
   // teddyProduits.forEach((dataTeddy) => {
        let contenerElt = document.createElement("div");
        contenerElt.classList.add("article");

      //  let teddyId = document.createElement("id");
       // teddyId.id = dataTeddy._id;
        let teddyName = document.createElement("strong");
        teddyName.textContent = teddyProduits.name;
        teddyName.style.color = "darkblue";
        teddyName.style.fontSyze = "20px";

        let teddyPrice = document.createElement("p");
        teddyPrice.textContent = teddyProduits.price + "€";

        let teddyDescription = document.createElement("p");
        teddyDescription.textContent = teddyProduits.description;

        let teddyImg = document.createElement("img");
        teddyImg.src = teddyProduits.imageUrl;
        teddyImg.style.width = "200px";
        teddyImg.style.paddingLeft = "90px";

        //creation du choix des couleurs :
        //création de l'élément seleect :
        let teddyColors = document.createElement('select');
        //création des élément options contenant les différentes couleurs :
        let teddyColorsOption1 = document.createElement('option');
        teddyColorsOption1.textContent = teddyProduits.colors[0];
        let teddyColorsOption2 = document.createElement('option');
        teddyColorsOption2.textContent = teddyProduits.colors[1];
        let teddyColorsOption3 = document.createElement('option');
        teddyColorsOption3.textContent = teddyProduits.colors[2];
        let teddyColorsOption4 = document.createElement('option');
        teddyColorsOption4.textContent = teddyProduits.colors[3];
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
        btnElt.setAttribute("id", "ajouterAuPanier");
        btnElt.addEventListener("click", ajouterAuPAnier);
      
        //création d'un élément br :
        let brElt = document.createElement("br");
        //on ajoute tous les éléments créé au conteneur :
       // contenerElt.appendChild(teddyId);
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
   // alert("recup produit ok");
}


//pour récupérer le panier :
let panier = JSON.parse(localStorage.getItem("panier"));

 //Vérification et initialisation du panier
if (localStorage.getItem("panier")) {
    console.log(panier);
} else {
    console.log("Le panier va être initalisé");
    let panierInit = [];
    localStorage.setItem("panier", JSON.stringify(panierInit));
}
 
//Ajout de l'article au panier de l'utilisateur
async function ajouterAuPAnier()  {
    const add = await displayAllTeddies();
    panier.push(add);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log(panier);
    alert("Cet article a été ajouté à votre panier");
    //alert(localStorage.getItem("panier"));
    //location.reload();
}

//afficher le nombre de teddy au panier :
function nbTeddyAddAuPanier(){
    let teddyAuPanier = document.getElementById("nbTeddyAuPanier");
    teddyAuPanier.textContent = panier.length;
    console.log("teddy au panier : " + panier.length);
}
function nbTeddyAddAuPanierPindex(){
    let teddyAuPanierI = document.getElementById("nbTeddyAuPanierPindex");
    teddyAuPanierI.textContent = panier.length;
    console.log("teddy au panier : " + panier.length);
}
    
function nbTeddyAddAuPanierPproduit(){
    let teddyAuPanierP = document.getElementById("nbTeddyAuPanierPproduit");
    teddyAuPanierP.textContent = panier.length;
    console.log("teddy au panier : " + panier.length);
}
    
//affichage page panier :
function creationPanier(){
    
   if(panier.length > 0){
        document.getElementById("panierVide").remove();

        for(let i = 0; i < panier.length; i++){
            let contenerElt = document.createElement("div");
            contenerElt.classList.add('article');

            let teddyName = document.createElement("strong");
            teddyName.textContent = panier[i].name;
            teddyName.style.color = "darkBlue";
            contenerElt.appendChild(teddyName);

            let teddyImg = document.createElement("img");
            teddyImg.src = panier[i].imageUrl;
            contenerElt.appendChild(teddyImg);
            teddyImg.setAttribute("alt", "Photo de" + teddyImg.name);
            teddyImg.setAttribute("title", "Photo de" + teddyImg.name);
            teddyImg.style.width = "200px";
            teddyImg.style.paddingLeft = "90px";

            let teddyPrice = document.createElement("p");
            teddyPrice.textContent = panier[i].price + " €";
            contenerElt.appendChild(teddyPrice);

            let teddySup = document.createElement("p");
            teddySup.textContent = "X";
            teddySup.style.color = "darkRed";
            teddySup.style.cursor = "pointer";
            teddySup.addEventListener("click", teddyRemove);
            function teddyRemove(i){
                panier.splice(i, 1); 
                localStorage.removeItem(i);
                // Mise à jour du panier avec suppression de l'article :
                localStorage.setItem("panier", JSON.stringify(panier));
                //Mise à jour de la page :
                window.location.reload();
            }   
            contenerElt.appendChild(teddySup);
            document.getElementById("addPanier").appendChild(contenerElt);
        } 
    }
}

