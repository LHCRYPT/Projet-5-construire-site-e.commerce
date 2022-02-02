let panier = [];
	// verifier s'il y a qlq chose
	if (localStorage.panier != undefined)
	{
		let str = localStorage.panier;
		// on transforme la chaine de caractere en VRAI array ou tableau
		panier = JSON.parse(str);
	}

    //fonction qui va chercher le prix actualisé de chaque marchandise du panier
    async function getPrix (id){ 
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


//------------------------------	
async function rechercheAffiche ()
{
	for (let p of panier)
	{
		p.prix = await  getPrix(p.product._id);
	}
	afficherPanier();
}	
//------------------------------	


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
        let sum = line.prix * line.quantity; // variable multiplier le prix par la quantité
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
    
// A faire prendre les infos de la pers
function envoyer(){

    fetch(url)
    .then(response=>response.json())
    .then(lastName=>{
         console.log(product);
         nom = lastName; //mémorise le nom
        
        let lastName = document.querySelector('#lastName').value;
        document.querySelector('#firstName').innerHTML=firstName;
        document.querySelector('#address').setAttribute('src',product.imageUrl);
        //récupérer nom/prénom... getelementby...afficher dans consol log...méthode fetch pour envoyer données FAIT PAR MOI
        clone.querySelector('.lastName').setAttribute ('data-indice', indice);
        clone.querySelector('.lastName').onclick = function (){
        console.log(this.value);
    
        afficherPanier();
        //enregistrer dans le local storage
        localStorage.panier = JSON.stringify(panier);
        document.getElementById ('lastName').innerHTML = nom;
        document.getElementById ('firstName').innerHTML = prénom;
        document.getElementById ('address').innerHTML = adress;
        document.getElementById ('city').innerHTML = ville;
        document.getElementById ('email').innerHTML = mail;
        afficherPanier ();
         //aller à la page html panier
    window.location = 'confirmation.html';
}

rechercheAffiche(); // c'est la fonction qui met à jour les prix
