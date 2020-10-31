
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

// --- PAGE INDEX ---
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
// ---- PAGE PRODUIT ----
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
        contenerElt.setAttribute("id", "contenerProduit");
        contenerElt.classList.add("article");

      //  let teddyId = document.createElement("id");
       // teddyId.id = dataTeddy._id;
        let teddyName = document.createElement("strong");
        teddyName.textContent = teddyProduits.name;
        teddyName.style.color = "darkblue";
        teddyName.style.fontSyze = "20px";

        let teddyPrice = document.createElement("p");
        teddyPrice.textContent = teddyProduits.price / 100 + "€";

        let teddyDescription = document.createElement("p");
        teddyDescription.textContent = teddyProduits.description;

        let teddyImg = document.createElement("img");
        teddyImg.src = teddyProduits.imageUrl;
        teddyImg.style.width = "200px";
        teddyImg.style.paddingLeft = "90px";

        //création de l'élément select :
        let teddyColors = document.createElement('select');
        teddyColors.setAttribute("id", "optionColor");
        //creation du choix des couleurs :
        teddyProduits.colors.forEach((teddyColorChoice)=>{
            let choixColor = document.createElement("option");
            teddyColors.appendChild(choixColor).textContent = teddyColorChoice;
        });
        
        //création des élément options contenant les différentes couleurs :
        /*let teddyColorsOption1 = document.createElement('option');
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
        */
        
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

// --- PANIER ---
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
    location.reload();
    window.location = "./index.html";
}

//afficher le nombre de teddy au panier :
function nbTeddyAddAuPanier(){
    let teddyAuPanier = document.getElementById("nbTeddyAuPanier");
    teddyAuPanier.textContent = panier.length;
    console.log("teddy au panier : " + panier.length);
}

//affichage page panier :
function creationPanier(){
    
   if(panier.length > 0){
       //si le panier n'est pas vide on supprime l'element panier vide :
        document.getElementById("panierVide").remove();
        //on créer les elements suivant pour l'article au panier :
        for(let i = 0; i < panier.length; i++){
            let contenerElt = document.createElement("div");
            contenerElt.classList.add('article');
            //nom :
            let teddyName = document.createElement("strong");
            teddyName.textContent = panier[i].name;
            teddyName.style.color = "darkBlue";
            contenerElt.appendChild(teddyName);
           /* //couleur :
            let teddyColors = document.createElement('p');
            teddyColors.textContent = panier[i].colors;
            contenerElt.appendChild(teddyColors);*/
            //image :
            let teddyImg = document.createElement("img");
            teddyImg.src = panier[i].imageUrl;
            contenerElt.appendChild(teddyImg);
            teddyImg.setAttribute("alt", "Photo de" + teddyImg.name);
            teddyImg.setAttribute("title", "Photo de" + teddyImg.name);
            teddyImg.style.width = "200px";
            teddyImg.style.paddingLeft = "90px";
            //prix :
            let teddyPrice = document.createElement("p");
            teddyPrice.textContent = panier[i].price / 100 + " €";
            contenerElt.appendChild(teddyPrice);
            //croix pour supprimer :
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
        //total du montant au panier :
        let sommeTotalPanier = 0;
        panier.forEach((panier)=>{
            sommeTotalPanier += panier.price / 100;
        });
        let totalPanier = document.createElement("p");
        totalPanier.classList.add('text-center');
        totalPanier.style.fontWeight = "bold";
        totalPanier.style.fontSize = "18px";
        totalPanier.style.textDecoration = "underline";
        totalPanier.textContent = "Montant total de votre panier : "+sommeTotalPanier+" €";
        document.getElementById("totalPanier").appendChild(totalPanier);
    }
}

// --- CONTRÔLE FORMULAIRE ---
//verification des inputs :
checkInput = () => {
    //regex :
    let number = /[0-9]/;
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let specialCharacter = /[§!@#$%^&*().?":{}|<>]/;

    //message contrôle :
    let message = "";

    //recuperation et tests des inputs :
    let nom = document.getElementById("nom").value;
    if(number.test(nom)==true || specialCharacter.test(nom)==true || nom==""){
        message = "Les inforamtions saisie ne sont pas valide, entrer des informations valide";
    }else{
        console.log("nom ok");
    }

    let prenom = document.getElementById("prenom").value;
    if(number.test(prenom)==true || specialCharacter.test(prenom)==true || prenom==""){
        message = "Les inforamtions saisie ne sont pas valide, entrer des informations valide";
    }else{
        console.log("prénom ok");
    }

    let emailInput = document.getElementById("email").value;
    if(email.test(emailInput)==false){
        message = "Les inforamtions saisie ne sont pas valide, entrer des informations valide";
    }else{
        console.log("email ok");
    }

    let adresse = document.getElementById("adresse").value;
    if(specialCharacter.test(adresse)==true || adresse==""){
        message = "Les inforamtions saisie ne sont pas valide, entrer des informations valide";
    }else{
        console.log("adresse ok");
    }

    let ville = document.getElementById("ville").value;
    if(number.test(ville)==true || specialCharacter.test(ville)==true || ville==""){
        message = "Les inforamtions saisie ne sont pas valide, entrer des informations valide";
    }else{
        console.log("ville ok");
    }

    //si un des champ n'est pas conforme message d'erreur :
    if( message != ""){
        alert("attention tous les champs ne sont pas remplis correctement!!")
    }else{//si non construction d'un objet contact qui sera envoyé :
        contact = {
            firstName: prenom,
            lastName: nom,
            address: adresse,
            city: ville,
            email: email
        };
        //on retourne un objet contacte :
        return contact;
    }
};

//verification que le panier n'est pas vide avant envoie : (OK)
checkPanier = () => {
    let checkPanier = JSON.parse(localStorage.getItem("panier"));
    //si le panier est vide :
    if(checkPanier.length < 1 || checkPanier == null){
        alert("votre panier est vide");
        console.log("Le panier est vide");
        return false;
    }else{
        console.log("le panier n'est pas vide");
        return true;
    }
};

//Envoie à l'API "http://localhost:3000/api/teddies/order",les objets contact et produits :
let contact;
let products = [];
let url = "http://localhost:3000/api/teddies/order";

let order = JSON.parse(sessionStorage.getItem("order"));

const envoiFormulaire = (sendForm, url) => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            sessionStorage.setItem("order", this.responseText);
            window.location = "./confirmation_commande.html";
            resolve(JSON.parse(this.responseText));
            console.log("formulaire envoyé"); 
        }else {
           // console.log("erreur lors de l'envoye du formulaire !");   
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(sendForm);
      console.log(sendForm);
    });
  };
// (OK)
confiramtionCommande = () => {
    let commander = document.getElementById("form_contact");
    commander.addEventListener("submit", (event) => {
        event.preventDefault();
        if(checkPanier() == true && checkInput()!= null){
            console.log("ok pour envoi(CC)");
            panier.forEach((teddy) =>{
                products.push(teddy._id);
            });
            console.log("ok pour tableau :"+products);
            //création de l'objet à envoyer :
            let commande = {
                contact, 
                products,
            };
            let sendForm = JSON.stringify(commande);
            envoiFormulaire(sendForm, url);
            console.log("formulaire envoyé"+commande);
            //une fois la commande passé, suppression du localStorage, du contact, du tableau :
            contact = {};
            products = [];
            localStorage.clear();
        }else{
            alert("Choisissez un article pour validé une commande")
            console.log("-- ERREUR, aucun article à la commande --");
        }
    });
}
//recup des infos pour affichage de la page confirmation :
recupOrder = () => {
    //si différent de null on recup order :
    if(sessionStorage.getItem("order") != null){
        //let order = JSON.parse(sessionStorage.getItem("order"));
        document.getElementById("orderId").textContent = order.orderId;
        document.getElementById("nomContact").textContent = order.contact.lastName;
        document.getElementById("prenomContact").textContent = order.contact.firstName;
        document.getElementById("adressContact").textContent = order.contact.address;
        document.getElementById("cityContact").textContent = order.contact.city;
        console.log("recupOrder :"+order);
        //removeItem pour supprimer order :
        //sessionStorage.removeItem("order");
    }else{
        //si non on redirige vers la page index :
        //window.location = "./index.html";
    }
};
//--- PAGE CONFIRMATION COMMANDE ---
//affichage du recap du panier:
recapCommande = () => {
    let recapPanier = document.getElementById("confirmation-recap");

    let tableauConfirmation = document.createElement("table");
    tableauConfirmation.style.marginLeft = "auto";
    tableauConfirmation.style.marginRight = "auto";
    recapPanier.appendChild(tableauConfirmation);

    let rang = document.createElement("tr");
    tableauConfirmation.appendChild(rang);

    let recapImgTeddy = document.createElement("th");
    recapImgTeddy.textContent = "Image Teddy";
    rang.appendChild(recapImgTeddy);

    let recapNomTeddy = document.createElement("th");
    recapNomTeddy.textContent = "Nom";
    rang.appendChild(recapNomTeddy);

    /*let recapColorTeddy = document.createElement("th");
    recapColorTeddy.textContent = "Couleur";
    rang.appendChild(recapColorTeddy);*/

    let recapPrixTeddy = document.createElement("th");
    recapPrixTeddy.textContent = "Prix"
    rang.appendChild(recapPrixTeddy);

    //incrémentation de l'id pour chaque ligne de teddy : (PROBLEME AVEC L'ID??)
    let i = 0;
    let order = JSON.parse(sessionStorage.getItem("order"));

    //pour chaque produit dans order :
    order.products.forEach((orderTeddy) => {
        let rangArticle = document.createElement("tr");
        rangArticle.setAttribute("id", "teddyAuPanier"+i);
        tableauConfirmation.appendChild(rangArticle);

        let imgTeddyRecap = document.createElement("img");
        imgTeddyRecap.src = orderTeddy.imageUrl;
        imgTeddyRecap.style.width = "100px";
        imgTeddyRecap.style.paddingLeft = "25px";
        rangArticle.appendChild(imgTeddyRecap);

        let nomTeddyRecap = document.createElement("td");
        nomTeddyRecap.textContent = orderTeddy.name;
        nomTeddyRecap.style.color = "darkBlue";
        rangArticle.appendChild(nomTeddyRecap);

       /* let colorTeddyRecap = document.createElement("td");
        colorTeddyRecap.textContent = orderTeddy.colors.value;
        rangArticle.appendChild(colorTeddyRecap);*/

        let prixTeddyRecap = document.createElement("td");
        prixTeddyRecap.textContent = orderTeddy.price / 100 + " €";
        prixTeddyRecap.style.paddingLeft = "30px";
        rangArticle.appendChild(prixTeddyRecap);

        
    });
    //ligne total du tableau :
    let rangTotal = document.createElement("tr");
    tableauConfirmation.appendChild(rangTotal);

    let colonneTotal = document.createElement("th");
    colonneTotal.textContent = "Total de votre panier :";
    rangTotal.appendChild(colonneTotal);

    let recapPrixTotal = document.createElement("td");
    recapPrixTotal.setAttribute("id", "sommeTotal");
    rangTotal.appendChild(recapPrixTotal);


    //calcul de l'addition total :
    let sommeTotal = 0;
    order.products.forEach((orderTeddy) => {
        sommeTotal += orderTeddy.price / 100;
    });
    //affichage du prix total dans la commande :
    console.log(sommeTotal);
    document.getElementById("sommeTotal").textContent = sommeTotal + " €";
};