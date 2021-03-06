let apiArticle = "";
fetch("http://localhost:3000/api/products")    // Fonction permettant d'envoyer une requête au service web afin de récuperer l'API
.then(function(response){                     // Fonction permettant de vérifier l'état de la promise
    if (response.ok) {
        return response.json();               // return de la promise au format json
    }
})
.then(function(valResponse){                   // récuperation des données retournées
    let apiArticle = valResponse;
    appendElenment(apiArticle);                // Appel de la fonction appendElenment
})
.catch(function(err){
    alert ("Récuperation des données API impossible" + err.message);
});

function appendElenment(apiArticle){        // Fonction permettant d'afficher les differents produit dans la page d'accueil
    for (let posArticle in apiArticle) {

        const insertLien = document.createElement("a");
        insertLien.href = `product.html?id=${apiArticle[posArticle]._id}`;

        const divArticle = document.createElement("article");
        
        const imgArticle = document.createElement("img");
        imgArticle.src = apiArticle[posArticle].imageUrl;
        imgArticle.alt = apiArticle[posArticle].altTxt; 

        const nomArticle = document.createElement("h3");
        nomArticle.classList.add("productName");
        nomArticle.innerHTML = apiArticle[posArticle].name;
       
        const descriptionArticle = document.createElement("p");       
        descriptionArticle.classList.add("productDescription");
        descriptionArticle.innerHTML = apiArticle[posArticle].description
        
        document.getElementById('items').appendChild(insertLien);
        insertLien.appendChild(divArticle);
        divArticle.appendChild(imgArticle);
        divArticle.appendChild(nomArticle);
        divArticle.appendChild(descriptionArticle);
    }
}