fetch("http://localhost:3000/api/products")
.then(function(response){
    if (response.ok) {
        return response.json();
    }
})
.then(function(valResponse){
    const apiArticle = valResponse;
    console.table(apiArticle);
    //for (let i=0; i<= valResponse.length-1; i++){
       // let positionTab = i ;
    for (let posArticle in apiArticle) {
        let insertLien = document.createElement("a");
        document.getElementById('items').appendChild(insertLien);
        insertLien.href = `product.html?id=${apiArticle[posArticle]._id}`;

        let divArticle = document.createElement("article");
        insertLien.appendChild(divArticle);

        let imgArticle = document.createElement("img");
        divArticle.appendChild(imgArticle);
        imgArticle.src = apiArticle[posArticle].imageUrl;
        imgArticle.alt = apiArticle[posArticle].altTxt; 

        let nomArticle = document.createElement("h3");
        divArticle.appendChild(nomArticle);
        nomArticle.classList.add("productName");
        nomArticle.innerHTML = apiArticle[posArticle].name;
       
        let descriptionArticle = document.createElement("p");
        divArticle.appendChild(descriptionArticle);
        descriptionArticle.classList.add("productDescription");
        descriptionArticle.innerHTML = apiArticle[posArticle].description;

    
    }
});