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
let id; //déclaration globale : pour que les id restent mémoriser, donc je le mets en dehors de la boucle then
fetch(url)
.then(response=>response.json())
.then(product=>{
     console.log(product);
     id = product._id;
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
//faire un push dans un tableau : produit couleur prix quantité


//puis stocké sur local storage ce tableau
 //window.location = 'cart.html'; //redirige vers la page html


}