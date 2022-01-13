function affichageNumCommande(){           //Fonction permettant d'afficher le numéro de commande
    document.getElementById("orderId").innerText = localStorage.getItem("idCom");
    localStorage.clear();
}
affichageNumCommande();