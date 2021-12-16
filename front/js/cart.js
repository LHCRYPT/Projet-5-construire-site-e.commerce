let panier = [];
	// verifier s'il y a qlq chose
	if (localStorage.panier != undefined)
	{
		let str = localStorage.panier;
		// on transforme la chaine de caractere en VRAI array ou tableau
		panier = JSON.parse(str);
	}

  let emplacement = document.querySelector('#cart__items'); // sélecteur sur la zone de dépôt
  let template = document.querySelector('#template'); //sélecteur sur le template

	// for each  pour déplier ou afficher le tableau
	for ( let line of panier)
	{
		console.log(line); 
        // on clone le template
        let clone = template.content.cloneNode(true);
        //on ajoute les infos de l'article : quantité, couleur etc A FAIRE 
        clone.querySelector('h2').innerHTML = line.product.name;
        clone.querySelector('img').setAttribute('src', line.product.imageUrl); // <img src="code ici"

        //afficher le prix, l'id, quantité + total
        clone.querySelector('.prix').innerHTML = line.product.price;
        clone.querySelector('.itemQuantity').innerHTML = line.product.quantity;
        //clone.querySelector('.total').innerHTML = line.product.total;
        // multiplier le prix par la quantité
        // on ajoute le clone à la zone de dépôt/emplacement
        emplacement.appendChild(clone);

 }
