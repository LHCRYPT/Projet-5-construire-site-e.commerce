let panier = [];
	// verifier s'il y a qlq chose
	if (localStorage.panier != undefined)
	{
		let str = localStorage.panier;
		// on transforme la chaine de caractere en VRAI array ou tableau
		panier = JSON.parse(str);
	}

    //fonction qui va chercher le prix actualisé de chaque marchandise du panier
function getPrix (id){ 
    return new Promise(
        (resolve) => {
            let url ='http://localhost:3000/api/products/'+id; 
            fetch(url)
            .then(response=>response.json())
            .then(product=>{
                //comme un return pour mettre à jour le prix
                resolve(product.price);
            });
        }

    );
}

     //afficher le panier
     function afficherPanier () {

     
  let emplacement = document.querySelector('#cart__items'); // sélecteur sur la zone de dépôt
  emplacement.innerHTML = '';
  let template = document.querySelector('#template'); //sélecteur sur le template
  let indice = 0;
  let total = 0;
  let nbArticle = 0;
	// for each  pour déplier ou afficher le tableau
	for ( let line of panier)
	{
		console.log(line); 
        
        // on clone le template
        let clone = template.content.cloneNode(true);
        //on ajoute les infos de l'article : quantité, couleur etc A FAIRE 
        clone.querySelector('h2').innerHTML = line.product.name;
        clone.querySelector('img').setAttribute('src', line.product.imageUrl); // <img src="code ici"
        let sum = line.product.price * line.quantity; // variable multiplier le prix par la quantité
        // on ajoute le total de chaque ligne au total global
        total = total + sum ;
        //on additionne toutes les quantités commandées par le client et la fonction parseInt() va permettre de faire comprendre au pc que line.quantity est un nombre
        //et pas une chaîne de charactères
        nbArticle = nbArticle + parseInt (line.quantity);

        //afficher le prix, quantité + total
        clone.querySelector('.prix').innerHTML = sum + ' €';
        
        
        clone.querySelector('.color').innerHTML = line.color;
        clone.querySelector('.itemQuantity').value = line.quantity;
        //on stocke l'indice dans un attribut sur le bouton, je veus savoir sur quelle ligne je suis
        clone.querySelector('.deleteItem').setAttribute ('data-indice', indice);
        clone.querySelector('.deleteItem').onclick = function (){
        let i = this.getAttribute('data-indice');
            console.log (i); //on supprime la ligne i (indice)
            panier.splice(i, 1); //on enlève (splice) du tableau, la ligne (objet)
            afficherPanier();
            //enregistrer dans le local storage
            localStorage.panier = JSON.stringify(panier);
        } 
        //on vient mettre l'indice du tableau sur le champ input quantité (on ajoute ou supprime des qtés au panier)
        clone.querySelector('.itemQuantity').setAttribute ('data-indice', indice);
        clone.querySelector('.itemQuantity').onchange = function (){
            console.log(this.value);
            //on vient mettre la nouvelle qté de la ligne 
            let i = this.getAttribute('data-indice');
            panier[i].quantity = this.value;
            afficherPanier();
            //enregistrer dans le local storage
            localStorage.panier = JSON.stringify(panier);
        } 
                  
          
        indice++;
       
   
        // on ajoute le clone à la zone de dépôt/emplacement
        emplacement.appendChild(clone);

 }
 

 //grand total 
document.getElementById ('totalPrice').innerHTML = total;
// nbr total d'articles achetés par un même client
document.getElementById ('totalQuantity').innerHTML = nbArticle;
} 

//mettre à jour le prix pour chaque ligne
async function majPrix (){
    for (let line of panier){
        getPrix (line.product._id).then((prix)=> {
            console.log (prix);
            //là je mets ici le prix dans le panier
            clone.querySelector('.prix').innerHTML = sum + ' €'; //ce que j'ai AJOUTE
        });
    } 
} 
majPrix ().then(()=> {
    console.log ('abc');
    afficherPanier ();
});



function envoyer(){

   
    window.location = 'confirmation.html';
}
