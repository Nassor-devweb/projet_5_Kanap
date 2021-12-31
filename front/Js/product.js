//let lienArticle = window.location.search;
let lienArticle = window.location.href;
console.log(lienArticle);
let lien = new URL(lienArticle);
let idArticle = lien.searchParams.get("id");
let infoArticle = "";
console.log(idArticle);

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
        console.table(couleur);
        const couleurArticle = document.createElement("option");
        couleurArticle.value = couleur;
        couleurArticle.innerHTML = couleur;
        document.getElementById("colors").appendChild(couleurArticle);
    }
}

function ajoutPanier(infoArticle){
    document.querySelector("#addToCart").addEventListener("click", function(){
        if(document.getElementById("quantity").value != 0 ){
            let quantityProduit = parseInt(document.getElementById("quantity").value);
            let couleurProduit = document.getElementById("colors").value;

            let caracterProduit = {
                quantiteArticlePanier : quantityProduit,
                colorArticlePanier : couleurProduit,
                idArticlePanier : idArticle,
                prixArticlePanier: infoArticle.price,
                nomProduit : infoArticle.name
            }
        
            let recupLocalstorage = JSON.parse(localStorage.getItem("Article"));
            console.table(recupLocalstorage);

            if (recupLocalstorage == null){
                localStorage.setItem("Article", JSON.stringify(caracterProduit));
            }

            if (recupLocalstorage != null){ 
                    if (recupLocalstorage.idArticlePanier === caracterProduit.idArticle && recupLocalstorage.colorArticlePanier === caracterProduit.couleurProduit){
                        let nouvQuantity = caracterProduit.quantiteArticlePanier + recupLocalstorage.quantiteArticlePanier;
                        recupLocalstorage.quantiteArticlePanier = nouvQuantity;
                        localStorage.setItem("Article", JSON.stringify(caracterProduit));
                    }
            console.table(recupLocalstorage);
            }
        }
    });
}




/*if (lien.has('id')){
    let idLien = lien.get('id');
}
console.log(idLien);*/