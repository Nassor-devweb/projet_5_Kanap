let apiArticle = "";
fetch("http://localhost:3000/api/products")
.then(function(response){
    if (response.ok) {
        return response.json();
    }
})
.then(function(valResponse){
    let apiArticle = valResponse;
    appendElenment(apiArticle); 
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