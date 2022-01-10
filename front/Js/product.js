//let lienArticle = window.location.search;
let lienArticle = window.location.href;
let lien = new URL(lienArticle);
let idArticle = lien.searchParams.get("id");
let infoArticle = "";

fetch("http://localhost:3000/api/products/" + idArticle)
.then(function(response){
    if(response.ok){
        return response.json();
    }
})
.then(function(apiArticle){
    let infoArticle = apiArticle;
    console.table(infoArticle.colors);
    const imgArticle = document.createElement("img");
    imgArticle.src = infoArticle.imageUrl;
    imgArticle.alt = infoArticle.altTxt;

    let nomProduit = document.getElementById('title');
    nomProduit.innerHTML = infoArticle.name;

    let prixArticle = document.getElementById('price');
    prixArticle.innerHTML = infoArticle.price;

    let descriptionArticle = document.getElementById('description');
    descriptionArticle.innerHTML = infoArticle.description;
 
    document.querySelector(".item__img").appendChild(imgArticle);

    insertCouleur(infoArticle);
    ajoutPanier(infoArticle);

});

function insertCouleur(infoArticle){
    for (let couleur of infoArticle.colors){
        const couleurArticle = document.createElement("option");
        couleurArticle.value = couleur;
        couleurArticle.innerHTML = couleur;
        document.getElementById("colors").appendChild(couleurArticle);
    }
}

function ajoutPanier(infoArticle){
    document.getElementById("addToCart").addEventListener("click", function(){
        if(document.getElementById("quantity").value > 0 ){
            let quantityProduit = parseInt(document.getElementById("quantity").value);
            let couleurProduit = document.getElementById("colors").value;

            let caracterProduit = {
                quantiteArticlePanier : quantityProduit,
                colorArticlePanier : couleurProduit,
                imgProduitPanier: infoArticle.imageUrl,
                idArticlePanier : idArticle,
                prixArticlePanier: infoArticle.price,
                nomProduit : infoArticle.name,
                altImgProduitPanier : infoArticle.altTxt
            }
            let recupLocalstorage = JSON.parse(localStorage.getItem("Article"));
            console.table(recupLocalstorage);

            if (recupLocalstorage == null){
                recupLocalstorage =[];
                recupLocalstorage.push(caracterProduit);
                localStorage.setItem("Article", JSON.stringify(recupLocalstorage));
                window.alert("Produit ajouté au panier");
            } else {
                const searchStorage = recupLocalstorage.find( (strg) => strg.idArticlePanier === idArticle && strg.colorArticlePanier === couleurProduit);
                if (searchStorage) {
                    let nvQuantity = caracterProduit.quantiteArticlePanier + searchStorage.quantiteArticlePanier;
                    searchStorage.quantiteArticlePanier = nvQuantity;
                    localStorage.setItem("Article", JSON.stringify(recupLocalstorage));
                    window.alert("Produit ajouté au panier");
                } else {
                    recupLocalstorage.push(caracterProduit);
                    localStorage.setItem("Article", JSON.stringify(recupLocalstorage));
                }
            }       
        }else {
            window.alert("Veuillez choisir une Quantité");
        }
    });
}
