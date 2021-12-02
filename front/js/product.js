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
let produit; //on déclare produit en global, pour pouvoir le réutiliser par la suite
fetch(url)
.then(response=>response.json())
.then(product=>{
     console.log(product);
     produit = product; //mémorise le produit
    
    document.querySelector('#title').innerHTML=product.name;
    document.querySelector('#price').innerHTML=product.price;
    document.querySelector('#image').setAttribute('src',product.imageUrl);
    //le déroulé avec les différentes couleurs
     let color = document.querySelector('#color');
     //pour dérouler le tableau, c=couleur
     for(let c of product.colors)
     {
         //<option> </option> pour créer une balise option
        let option = document.createElement('option');
        //innerHtml : veut mettre à l'intérieur de la balise
        option.innerHTML = c; //<option> bleu </option>
        option.setAttribute('value',c); //<option value = "bleu"> bleu </option>
        color.appendChild(option); //on met la balise option dans la balise select id=color
     }
        
});

document.querySelector('#addToCart').onclick = function()
{
    //récupérer couleur nom etc
    let color = document.querySelector('#color').value;
    console.log(id);
    console.log(color);
    console.log(produit);
    let quantity = document.querySelector('#itemQuantity').value;
    console.log(quantity);


    let line = {};  //je crée un objet une ligne de commande;
	// attributs ce sont les variables d'un  objet
	line.product = produit; // je definie un attribut non et sa valeur
	line.color = color;
	line.quantity = quantity;
  

    let panier = [];
	// verifier s'il y a qlq chose
	if (localStorage.panier != undefined)
	{
		let str = localStorage.tableau;
		// on transforme la chaine de caractere en VRAI array ou tableau
		panier = JSON.parse(str);
	}
    panier.push(line);
    	// on transforme en chaine de carac.
	let str = JSON.stringify(panier)
	console.log(str);
	//localStorage.t = ... 
	localStorage.panier = str;
}    