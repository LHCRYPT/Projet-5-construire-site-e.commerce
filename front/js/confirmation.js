//mon url = confirmation.html?commande=1234
	let paramsString = window.location.search;
	let searchParams = new URLSearchParams(paramsString); //on créé un objet qui permet d'extraire les valeurs des paramètres
	let commande= searchParams.get('commande');
	console.log(commande);
//on l'affiche dans l'HTML avec le sélecteur
    document.getElementById('orderId').textContent = commande;

   