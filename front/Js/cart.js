const regexLFrstNameCity = "^[a-zA-Z ,.'-]+$";
const regexAdress = "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+";
const regexEmail = '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$';
let contenuLocalStorage = JSON.parse(localStorage.getItem("Article")); // Importation du contenu du local storage dans la variable.
console.table(contenuLocalStorage);

function recupLocalStorage(){               // Fonction permettant d'inserer le contenu du local storage dans la page panier.

    if (contenuLocalStorage !== null ){                                              
        for (let produit in contenuLocalStorage){
    
            const appndArticle = document.createElement("article");                                              
            appndArticle.className = "cart__item";                                                              
            appndArticle.setAttribute('data-color', contenuLocalStorage[produit].colorArticlePanier);         
            appndArticle.setAttribute('data-id', contenuLocalStorage[produit].idArticlePanier);               
    
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
            appndTitle.className = contenuLocalStorage[produit].idArticlePanier;
            appndTitle.id = 'idP';
    
            const appndTitleColor = document.createElement("p");
            appndTitleColor.innerHTML = contenuLocalStorage[produit].colorArticlePanier;
            appndTitleColor.className = "colorB";
            
    
            const appndPrice = document.createElement("p");
            appndPrice.innerHTML = contenuLocalStorage[produit].prixArticlePanier + " €";
    
            const appndContentSettings = document.createElement("div");
            appndContentSettings.className = "cart__item__content__settings";
    
            const appndSettingsQuantity = document.createElement("div");
            appndSettingsQuantity.className = "cart__item__content__settings__quantity";
    
            const appndproductQte = document.createElement("p");
            appndproductQte.innerHTML = "Qté : ";
    
            const appndQuantityProduit = document.createElement("input");
            appndQuantityProduit.value = contenuLocalStorage[produit].quantiteArticlePanier;
            appndQuantityProduit.className = "itemQuantity";
            appndQuantityProduit.setAttribute("type", "number");
            appndQuantityProduit.setAttribute("min", "1");
            appndQuantityProduit.setAttribute("max", "100");
            appndQuantityProduit.setAttribute("name", "itemQuantity");
    
            const appndSettingsDelete = document.createElement("div");
            appndSettingsDelete.className = "cart__item__content__settings__delete";
    
            const appndSupprimer = document.createElement("p");
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
    
            const appndArticle = document.createElement("article"); 
            appndArticle.className = "cart__item";  
            const alertPanierVide = document.createElement("p");
            alertPanierVide.style.color = "red";
            alertPanierVide.style.fontSize = "30px";
            alertPanierVide.innerHTML = "Votre panier est vide !!!";
            document.getElementById("cart__items").appendChild(appndArticle);
            appndArticle.appendChild(alertPanierVide);
    }

}
recupLocalStorage();   // Appel de la fonction recupLocalStorage

function prixQuantiteTotal(){           // Fonction permettant d'afficher le prix total ainsi que la quantité totale
        let totalPanier = 0;
        let quantiteProduitTot = 0;
        if (contenuLocalStorage !== null){          
            for (let i = 0; i < contenuLocalStorage.length; i++){
            let quantiteProduit = contenuLocalStorage[i].quantiteArticlePanier;
            let prixProduit = contenuLocalStorage[i].prixArticlePanier;
            quantiteProduitTot += quantiteProduit ; 
            totalPanier +=  quantiteProduit * prixProduit; 
            }   
        }else{
            totalPanier =  0;
            document.getElementById('totalPrice').innerHTML = totalPanier;
        }
    console.log(totalPanier);
    document.getElementById('totalPrice').innerHTML = totalPanier;
    document.getElementById('totalQuantity').innerHTML = quantiteProduitTot;
}

prixQuantiteTotal();   // Appel de la fonction prixQuantiteTotal

function modificationQ () {     // Fonction permettant de mettre à jour le prix total après modification de la quantitée.

    if (recupLocalStorage !== null){
        inptQt = document.querySelectorAll(".itemQuantity");
        classElementColorinit = document.getElementsByClassName('colorB');
        idElementsInit = document.querySelectorAll("#idP");
        console.log(idElementsInit);
        for (let k = 0; k < inptQt.length; k++){
            inptQt[k].addEventListener("change" , function(e) {
                e.preventDefault();

                let classElementColor = classElementColorinit[k].innerHTML;
                let idElements = idElementsInit[k].className;
                let newQuantity = inptQt[k].valueAsNumber;

                contenuLocalStorage.forEach(function(comp) {
                    if (comp.quantiteArticlePanier !== newQuantity && comp.idArticlePanier == idElements && comp.colorArticlePanier == classElementColor && newQuantity >= 0) {
                    comp.quantiteArticlePanier = newQuantity;
                    localStorage.setItem("Article", JSON.stringify(contenuLocalStorage));            
                    }
                });
                location.reload();
            }) 
        }
    }  

}

modificationQ ();         // Appel de la fonction modificationQ

function suppressionProduit(){           // Fonction permettant de supprimer un article via le panier

    let suppElement = document.querySelectorAll(".deleteItem");
    console.log(suppElement);
    let classElementColorinit = document.getElementsByClassName('colorB');
    let idElementsInit = document.querySelectorAll("#idP");

    for ( let j = 0 ; j <= suppElement.length -1 ; j++){
        suppElement[j].addEventListener("click", function(e) {
            e.preventDefault();

            let classElementColor = classElementColorinit[j].innerHTML;
            let idElements = idElementsInit[j].className;

            contenuLocalStorage = contenuLocalStorage.filter( supp => supp.idArticlePanier !== idElements || supp.colorArticlePanier !== classElementColor );
            localStorage.setItem("Article", JSON.stringify(contenuLocalStorage));            
            location.reload();
        });
    }
    console.log(suppElement);
    if (suppElement.length == 0){
        localStorage.clear();
    } 
}
suppressionProduit();                       // Appel de la fonction suppressionProduit

function validationForm(inputf,regexf){                // La fonction indique à l'utilisateur si la valeur saisie respect le format de text
    inputf.addEventListener('change',function(e){
        e.preventDefault();
        let objetRegex = new RegExp(regexf);
        if (objetRegex.test(inputf.value)) {
            inputf.nextElementSibling.innerHTML = '<i class="fas fa-check"></i>';
            inputf.className = "ok";
        } else {
            inputf.nextElementSibling.innerHTML = 'Format de saisi inccorect';
            inputf.className = "incorrect";
        } 
    });
}

function verifRegex (value,regex){             // La fonction retourne true si la valeur saisir respect le regex
    return new RegExp(regex).test(value);
}

function verifForm(){                       // Fonction permettant la validation du formulaire 

    inputFirstName = document.getElementById('firstName');
    inputLastName  = document.getElementById('lastName');
    inputAddress  = document.getElementById('address');
    inputCity  = document.getElementById('city');
    inputEmail  = document.getElementById('email');

    validationForm(inputFirstName,regexLFrstNameCity);
    validationForm(inputLastName,regexLFrstNameCity);
    validationForm(inputAddress,regexAdress);
    validationForm(inputCity,regexLFrstNameCity);
    validationForm(inputEmail,regexEmail);

}
verifForm();                                // Appel de la fonction verifForm

function envoiDataForm(){                 // Fonction permettant l'envoie des données
    
        document.getElementById("order").addEventListener("click", function(e) {
            e.preventDefault();
            if (contenuLocalStorage !== null){
                const prenom = document.getElementById('firstName');
                const nom = document.getElementById('lastName');
                const adressePost = document.getElementById('address');
                const ville = document.getElementById('city');
                const adresseEmail = document.getElementById('email');
        
                const IdCom = [];
                for (let i = 0; i<contenuLocalStorage.length;i++) {
                    IdCom.push(contenuLocalStorage[i].idArticlePanier);
                };
                const infoContact = {
                    contact : {
                        firstName: prenom.value,
                        lastName: nom.value,
                        address: adressePost.value,
                        city: ville.value,
                        email: adresseEmail.value,
                    },
                    products: IdCom,
                } 
        
                console.log(verifRegex (infoContact.contact.firstName,regexLFrstNameCity));
                console.log(verifRegex (infoContact.contact.lastName,regexLFrstNameCity));
                console.log(verifRegex (infoContact.contact.address,regexAdress));
                console.log(verifRegex (infoContact.contact.city,regexLFrstNameCity));
                console.log(verifRegex (infoContact.contact.email,regexEmail));
                
                if (verifRegex (infoContact.contact.firstName,regexLFrstNameCity) && 
                verifRegex (infoContact.contact.lastName,regexLFrstNameCity) && 
                verifRegex (infoContact.contact.address,regexAdress) && 
                verifRegex (infoContact.contact.city,regexLFrstNameCity) && 
                verifRegex (infoContact.contact.email,regexEmail))      {

                    fetch("http://localhost:3000/api/products/order", {
        
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json', 
                            "Content-Type": "application/json" 
                        },
                        body: JSON.stringify(infoContact)
                    })
                    .then(function(res) {
                        console.log(res);
                        if (res.ok) {
                        return res.json();
                        }
                    })
                    .then(function(data) {
                        localStorage.clear();
                        let numOrder = data.orderId;
                        //localStorage.setItem("idCom",data.orderId);
                        document.location.href = `confirmation.html?id=${numOrder}`;
                    })
                
                    .catch((err) => {
                        alert ("Envoie des données échoué " + err.message);
                    }); 

                }else{
                    window.alert("Veuillez saisir correctement les données");
                }
          
            }else{
                window.alert ("Envoi du formulaire impossible car Panier vide !!!");
            }
        });
    
}
envoiDataForm();                          // Appel de la fonction envoiDataForm
