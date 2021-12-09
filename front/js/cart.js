/*
let url = "http://localhost:3000/api/products/";
fetch(url)
.then(response=>response.json())
.then(data=>{
    for(let p of data){ 
    let template=document.querySelector('#produit');
    let items=document.querySelector('#items');
    // Clone the new row and insert it into the table
    let clone = template.content.cloneNode(true);
    //je viens alimenter la div items avec le template
    let nom=p.name;
    clone.querySelector('.productName').innerHTML=nom;
    clone.querySelector('.imgName').setAttribute('src',p.imageUrl);
   
    clone.querySelector('.productDescription').innerHTML=p.description;
    let href = './product.html?id='+p._id;
    clone.querySelector('.lien').setAttribute('href',href);
    items.appendChild(clone);
}
});

	//On recupere le chemin complet
	let chemin = window.location.href;
	// on decoupe la chaine de caractere en tableau au du =
	let tableau = chemin.split('=');
	// tableau[0] = 'cart.html?id'
	// tableau[1] = '1234'
	let id = tableau[1];
	console.log(id);
*/
//récupérer le tableau depuis local storage et l'afficher avec boucle for each
//lire local storage

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
        // multiplier le prix par la quantité
        // on ajoute le clone à la zone de dépôt/emplacement
        emplacement.appendChild(clone);

 }
