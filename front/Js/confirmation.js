function affichageNumCommande(){
    document.getElementById("orderId").innerText = localStorage.getItem("idCom");
    localStorage.clear();
}
affichageNumCommande();