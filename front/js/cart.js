let panier = []; //On définit un tableau vide dans le cas où il n'y ait rien dans le localstorage
// verifier s'il y a qlq chose
if (localStorage.panier != undefined) {
    let str = localStorage.panier;
    // on transforme la chaine de caractere en VRAI array ou tableau
    panier = JSON.parse(str);
}

//fonction qui va chercher le prix actualisé de chaque marchandise du panier
async function getPrix(id) {
    return new Promise(
        (resolve) => {
            let url = 'http://localhost:3000/api/products/' + id;
            fetch(url)
                .then(response => response.json())
                .then(product => {
                    //comme un return pour mettre à jour le prix
                    resolve(product.price);
                });
        }

    );
}


//------------------------------	
//fonction qui parcourt le panier et qui demande et attends le prix  
async function rechercheAffiche() {
    for (let line of panier) {
        line.prix = await getPrix(line.id);
    }
    afficherPanier();
}
//------------------------------	


//fonction qui va afficher tout le tableau JS du panier en html
function afficherPanier() {


    let emplacement = document.querySelector('#cart__items'); // sélecteur sur la zone de dépôt
    emplacement.textContent = ''; //on vide la partie html à chaque fois qu'on fait une action
    let template = document.querySelector('#template'); //sélecteur sur le template
    let indice = 0;
    let total = 0;
    let nbArticle = 0;
    // for each  pour déplier ou afficher le tableau
    for (let line of panier) {
        console.log(line);

        // on clone le template
        let clone = template.content.cloneNode(true);
        //on ajoute les infos de l'article : quantité, couleur etc A FAIRE 
        clone.querySelector('h2').textContent = line.name;
        clone.querySelector('img').setAttribute('src', line.imageUrl); // <img src="code ici"
        let sum = line.prix * line.quantity; // variable multiplier le prix par la quantité
        // on ajoute le total de chaque ligne au total global
        total = total + sum;
        //on additionne toutes les quantités commandées par le client et la fonction parseInt() va permettre de faire comprendre au pc que line.quantity est un nombre
        //et pas une chaîne de charactères
        nbArticle = nbArticle + parseInt(line.quantity);

        //afficher le prix, quantité + total
        clone.querySelector('.prix').textContent = sum + ' €';
        clone.querySelector('.color').textContent = line.color;
        clone.querySelector('.itemQuantity').value = line.quantity;
        //on stocke l'indice dans un attribut sur le bouton, je veux savoir sur quelle ligne je suis
        clone.querySelector('.deleteItem').setAttribute('data-indice', indice);
        //fonction qui supprime une ligne du tableau
        clone.querySelector('.deleteItem').onclick = function () {
            let i = this.getAttribute('data-indice');
            console.log(i); //on supprime la ligne i (indice)
            panier.splice(i, 1); //on enlève (splice) du tableau, la ligne (objet)
            afficherPanier();
            //enregistrer dans le local storage
            localStorage.panier = JSON.stringify(panier);
        }
        //on vient mettre l'indice du tableau sur le champ input quantité 
        clone.querySelector('.itemQuantity').setAttribute('data-indice', indice);
        //fonction qui permet de changer la qté (on ajoute ou supprime des qtés au panier)
        clone.querySelector('.itemQuantity').onchange = function () {
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
    document.getElementById('totalPrice').textContent = total;
    // nbr total d'articles achetés par un même client
    document.getElementById('totalQuantity').textContent = nbArticle;
}

// A faire prendre les infos de la pers
function envoyer() {
    /*
        let body ={};
        body.contact ={};
        body.contact.lastname ="document.getElementById ('lastName').textContent = Nom;"
        body.contact.firstname ="document.getElementById ('firstName').textContent = Prénom;"
        body.contact.address ="document.getElementById ('address').textContent = Adresse;"
        body.contact.city ="document.getElementById ('city').textContent = Ville;"
        body.contact.email ="document.getElementById ('email').textContent = Email;"
        body.products =[];

    
       il faut parcourir le panier pour rajouter les id du produit 
       //fonction qui parcourt le panier et qui demande et attends le id du produit  
async function rechercheAffiche() {
    for (let line of panier) {
        line.product = await product._id(line.id);
    }
    afficherPanier();
}
faire la boucle for
let _id = document.querySelector('#id');
	        //pour dérouler le tableau, i=_id
	        for (let i of product.id)

body.products.push(...) ok pas supprimer
    
        Il faut faire un POST avec fetch method: 'POST'
        fetch(url, options)
            .then(res => res.json())
            .then(res => console.log(res));
            )
     }*/  

//Message d'erreur avec regex si erreur quand il indique son nom
function test() {
    try {
         var regEx = /firstName|lastName/city;
         var str = "number";
         if(!regEx.test(str)) return null;
         var a = new Array();
         var result;
         var o=0;
         while((result = regEx.exec(str)) != null) {
                 a.push(result.index+o);
                 str=str.substr(result.index+result[0].length);
                 o+=result.index+result[0].length;
         }
         return a;
} catch(exp) {
         alert(exp.message);
}
OU
function verification(){
 
	var nom = document.formulaire.lastName.value;
	var prenom = document.formulaire.firstName.value;
	var address = document.formulaire.address.value;
	var mail = document.formulaire.email.value;
 
	var Ermail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/
	var Erage = /[0-9]{3}/;
 
	if(lastName == ""){
		alert("Le nom saisi est incorrect");
		return false;
	}else if(firstName == ""){
		alert("Le prénom saisi est incorrect");
		return false;
	}else if(address == ""){
		alert("addresse incorrecte");
		return false;
	}else if(email == ""){
		alert("l'Email est incorrect");
		return false;
	}
	return true;
}

afficherPanier();
            //enregistrer dans le local storage
            localStorage.panier = JSON.stringify(panier);
}

rechercheAffiche();

   //aller à la page html panier
   window.location = 'confirmation.html';
}