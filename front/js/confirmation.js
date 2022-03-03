//mon url = confirmation.html?commande=1234
	// objectif récupérer la variable let commande = 1234 pour l'afficher
	//On recupere le chemin complet
	let chemin = window.location.href;
	// on decoupe la chaine de caractere en tableau au du =
	let tableau = chemin.split('=');
	// tableau[0] = 'confirmation.html?commande'
	// tableau[1] = '1234'
	let commande = tableau[1];
	console.log(commande);
//on l'affiche dans l'HTML avec le sélecteur
    document.getElementById('orderId').textContent = commande;