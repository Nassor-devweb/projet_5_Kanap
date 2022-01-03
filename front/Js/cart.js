let contenuLocalStorage = JSON.parse(localStorage.getItem("Article")); // Importation du contenu du local storage dans la variable.
console.table(contenuLocalStorage);


function recupLocalStorage(){

    if (contenuLocalStorage !== null){
        for (let produit in contenuLocalStorage){
    
            const appndArticle = document.createElement("article"); // création d'une balise article
            appndArticle.className = "cart__item";  // création d'une class cart_item 
            appndArticle.setAttribute('data-color', contenuLocalStorage[produit].colorArticlePanier); // insertition d'un attribut avec comme valeur la couleur du produit
            appndArticle.setAttribute('data-id', contenuLocalStorage[produit].idArticlePanier);  // insertition d'un attribut avec comme valeur l'ID du produit.
    
    
            const appndDiv = document.createElement("div");     
            appndDiv.className = "cart__item__img";
    
            const appndImg = document.createElement("img");
            appndImg.src = contenuLocalStorage[produit].imgProduitPanier;
            appndImg.alt = contenuLocalStorage[produit].altImgProduitPanier;
    
            const appndItemContent = document.createElement("div");
            appndItemContent.className = "cart__item__content";
    
            const appndItemdescription = document.createElement("div");
            appndItemdescription.className = "cart__item__content__description";
    
            const appndTitle = document.createElement("h2");
            appndTitle.innerHTML = contenuLocalStorage[produit].nomProduit;
    
            const appndTitleColor = document.createElement("p");
            appndTitleColor.innerHTML = contenuLocalStorage[produit].colorArticlePanier;
    
            const appndPrice = document.createElement("p");
            appndPrice.innerHTML = contenuLocalStorage[produit].prixArticlePanier + " €";
    
            const appndContentSettings = document.createElement("div");
            appndContentSettings.className = "cart__item__content__settings";
    
            const appndSettingsQuantity = document.createElement("div");
            appndSettingsQuantity.className = "cart__item__content__settings__quantity";
    
            const appndproductQte = document.createElement("p");
            appndproductQte.innerHTML = "Qté : ";
    
            let appndQuantityProduit = document.createElement("input");
            appndQuantityProduit.value = contenuLocalStorage[produit].quantiteArticlePanier;
            appndQuantityProduit.className = "itemQuantity";
            appndQuantityProduit.setAttribute("type", "number");
            appndQuantityProduit.setAttribute("min", "1");
            appndQuantityProduit.setAttribute("max", "100");
            appndQuantityProduit.setAttribute("name", "itemQuantity");
    
            let appndSettingsDelete = document.createElement("div");
            appndSettingsDelete.className = "cart__item__content__settings__delete";
    
            let appndSupprimer = document.createElement("p");
            appndSupprimer.className = "deleteItem";
            appndSupprimer.innerHTML = "Supprimer";



            document.getElementById("cart__items").appendChild(appndArticle);
            appndArticle.appendChild(appndDiv);
            appndDiv.appendChild(appndImg);
            appndArticle.appendChild(appndItemContent);
            appndItemContent.appendChild(appndItemdescription);
            appndItemdescription.appendChild(appndTitle);
            appndItemdescription.appendChild(appndTitleColor);
            appndItemdescription.appendChild(appndPrice);
            appndItemContent.appendChild(appndContentSettings);
            appndContentSettings.appendChild(appndSettingsQuantity);
            appndSettingsQuantity.appendChild(appndproductQte);
            appndSettingsQuantity.appendChild(appndQuantityProduit);
            appndContentSettings.appendChild(appndSettingsDelete);
            appndSettingsDelete.appendChild(appndSupprimer);

        }
    } else {
    
        const appndArticle = document.createElement("article"); // création d'une balise article
        appndArticle.className = "cart__item";  // création d'une class cart_item 

        const alertPanierVide = document.createElement("p");
        alertPanierVide.style.color = "red";
        alertPanierVide.style.fontSize = "30px";
        alertPanierVide.innerHTML = "Votre panier est vide !!!";

        document.getElementById("cart__items").appendChild(appndArticle);
        appndArticle.appendChild(alertPanierVide);
    }

}
recupLocalStorage();

