	//mon url = product.html?id=1234
	// object let id = 1234
	//On recupere le chemin complet
	let chemin = window.location.href;
	// on decoupe la chaine de caractere en tableau au du =
	let tableau = chemin.split('=');
	// tableau[0] = 'product.html?id'
	// tableau[1] = '1234'
	let id = tableau[1];
	console.log(id);

	// recupéré le produit
	let url ='http://localhost:3000/api/products/'+id; // on concatene l id a la chaine de caracteres

fetch(url)
.then(response=>response.json())
.then(product=>{
     console.log(product);
    document.querySelector('#title').innerHTML=product.name;
    document.querySelector('#price').innerHTML=product.price;
    document.querySelector('#image').setAttribute('src',product.imageUrl);
    //faire ici le déroulé avec kes différentes couleurs
});