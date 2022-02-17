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
    
    document.querySelector('#title').textContent=product.name;
    document.querySelector('#price').textContent=product.price;
    document.querySelector('#image').setAttribute('src',product.imageUrl);
    //le déroulé avec les différentes couleurs
     let color = document.querySelector('#color');
     //pour dérouler le tableau, c=couleur
     for(let c of product.colors)
     {
         //<option> </option> pour créer une balise option
        let option = document.createElement('option');
        //innerHtml : veut mettre à l'intérieur de la balise
        option.textContent = c; //<option> bleu </option>
        option.setAttribute('value',c); //<option value = "bleu"> bleu </option>
        color.appendChild(option); //on met la balise option dans la balise select id=color
     }
        
});

//fonction pour ajouter au panier
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
	line.id = produit._id; // je definie un attribut id et sa valeur
    line.name = produit.name;
	line.color = color;
	line.quantity = quantity;
    line.imageUrl = produit.imageUrl;
  

    let panier = [];
	// verifier s'il y a qlq chose
	if (localStorage.panier != undefined)
	{
		let str = localStorage.panier;
		// on transforme la chaine de caractere en VRAI array ou tableau
		panier = JSON.parse(str);
	}
    //VERIFIEZ QUE LE CANAPE AVEC LA COULEUR N EST PAS DEJA DANS LE TABLEAU
   //FAIRE BOUCLE FOR AVEC VARIABLE present=0 et bien je fais un push
   let color = ["un", "deux", "trois", "quatre"];
   color.forEach((color) => {
     console.log(color);
     if (color === "1") {
        color.shift();
     }
   });

    panier.push(line);
    // on transforme en chaine de carac.
	let str = JSON.stringify(panier)
	console.log(str);
	//localStorage.t = ... 
	localStorage.panier = str;
    //aller à la page html panier
    window.location = 'cart.html';
}    