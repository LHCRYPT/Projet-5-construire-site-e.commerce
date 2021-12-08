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

//récupérer le tableau depuis local storage et l'afficher avec boucle for each
//lire local storage

let panier = [];
	// verifier s'il y a qlq chose
	if (localStorage.panier != undefined)
	{
		let str = localStorage.tableau;
		// on transforme la chaine de caractere en VRAI array ou tableau
		panier = JSON.parse(str);
	}

/*let tableau   
	// for each  pour déplier ou afficher le tableau
	for ( let color of tableau)
	{
		console.log(color);

 }*/

 //cibler les balises pour créer tableau html
 {
	//on pose toutes les variables dont on aura besoin
	var arrayLignes = document.getElementById("tableau").rows;
	var Produit = new Produit();
	var Produit = date.getProduit();
	var Color = date.getColor()+1;
	var Quantity = date.getQuantity();
	var i=1;//car la première ligne correspond à thead
}