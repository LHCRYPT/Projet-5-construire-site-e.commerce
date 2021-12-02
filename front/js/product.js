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


// créer un panier
// on stocke
let panier = ['rouge','bleu','violet'];
console.log(panier);
// on transforme en chaine de carac.
let str = JSON.stringify(panier)
console.log(str);
//localStorage.toto .. = ... 
localStorage.tableau = str;

let panier = [];
	// verifier si il y a qlq chose
	if (localStorage != undefined)
	{
		let str = localStorage.tableau;
		// on transforme la chaine de caractere en VRAI array ou tablea
		panier = JSON.parse(str);
	}
	console.log(panier);

//faire un push dans un tableau : produit couleur prix quantité
let tableau = ['Kanap sinopé','bleu','1849', '1'];
	console.log(tableau);
	
 let tableau   
	// for each  pour déplier ou afficher le tableau
	for ( let color of tableau)
	{
		console.log(color);

 


}
let personne = {};  //je crée un objet personne;
	// attributs ce sont les variables d'un  obejet
	personne.nom = 'MOI'; // je definie un attribut non et sa valeur
	personne.prenom = 'Linda';
	personne.adresse = '32 rue du Paradis' ;
    personne.ville = 'grenoble';
    personne.email = 'linda.moi@toujours.fr';


	tabPersonnes.push(personne);

	let p ={ nom:'MOI',prenom:'Linda',adresse:'32 rue du Paradis' ,ville:'grenoble' ,email: 'linda.moi@toujours.fr' };
	tabPersonnes.push(p);

	console.log(tabPersonnes);

	// afficher les personnes 
	for ( let people of tabPersonnes)
	{
		console.log(people.prenom+' '+people.nom);
		let demo = document.querySelector('#demo');
		let p = document.createElement('p'); // <p></p>
		p.innerHTML = people.prenom+' '+people.nom; // <p> Linda MOI</p>
		// je met p dans la div
		demo.appendChild(p);
	}
//puis stocké sur local storage ce tableau


 //window.location = 'cart.html'; //redirige vers la page html


