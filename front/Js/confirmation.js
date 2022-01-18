//Fonction permettant d'afficher le numéro de commande
function affichageNumCommande(){           
    const lienNum = window.location.href;
    const lienOrder = new URL(lienNum);
    const idOrder = lienOrder.searchParams.get("id");
    document.getElementById("orderId").innerText = idOrder;
    localStorage.clear();
}
affichageNumCommande();