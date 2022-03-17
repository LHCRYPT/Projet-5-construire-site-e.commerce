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

//prendre les infos de la pers
function envoyer() {
    verification();
    //on vient récupérer tous les champs input du formulaire
    let body = {};
    body.contact = {};
    body.contact.lastName = document.getElementById('lastName').value;
    body.contact.firstName = document.getElementById('firstName').value;
    body.contact.address = document.getElementById('address').value;
    body.contact.city = document.getElementById('city').value;
    body.contact.email = document.getElementById('email').value;
    body.products = [];


    //il faut parcourir le panier pour rajouter les id du produit 
    //fonction qui parcourt le panier et qui demande et attends le id du produit  
    for (let line of panier) {
        body.products.push(line.id);
    }
    console.log(body);

    //pour envoyer body vers l'api avec la méthode POST
    let url = 'http://localhost:3000/api/products/order/';
    let options = {};
    options.method = 'POST';
    options.body = JSON.stringify(body); //ça transforme l'objet body en une chaine de caractères
    options.headers = { //objet pour spécifier que c'est en json
        'Content-Type': 'application/json'
    }

    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            //envoyer le n° de la commande dans l'url/autre page
        //    window.location = 'confirmation.html?commande=' + res.orderId;
        });
}
rechercheAffiche();
afficherPanier();

//Message d'erreur avec regex si il y a des erreurs dans le formulaire C'EST FAIT
//A FAIRE : message erreur doit s'afficher sur la page, enlever alert, regex pour erreur si on met un nbr

function verification(){
 
	let nom = document.getElementById('lastName').value;
	let prenom = document.getElementById('firstName').value;
	let address = document.getElementById('address').value;
	let email = document.getElementById('email').value;
 
	let ermail = '/^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/'; 
    let regexEmail = new RegExp(ermail) 
	//let Erage = /[0-9]{3}/;
 
	if(nom.length==0){ //si le nbr de caractète est égale à 0, il indique que c'est faux
		alert("Le nom saisi est incorrect");
		return false;
	}else if(prenom.length==0){
		alert("Le prénom saisi est incorrect");
		return false;
	}else if(address.length==0){
		alert("addresse incorrecte");
		return false;
	}else if(email.length==0){
		alert("L'email est incorrect");
		return false;
    }else if(regexEmail.test(email)== false) {
    alert("L'email est incorrect");
}
	return true;
}

//ce que j'ai fait
if (homme==false && femme==false) {
    tooltip[0].style.visibility='visible';
    return false;
   }

   // Il y a plusieurs façon de sélectionner un nœud DOM ; ici on récupère
// le formulaire et le champ d'e-mail ainsi que l'élément span
// dans lequel on placera le message d'erreur avec API

var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('email');
var error = document.querySelector('.error');

email.addEventListener("input", function (event) {
  // Chaque fois que l'utilisateur saisit quelque chose
  // on vérifie la validité du champ e-mail.
  if (email.validity.valid) {
    // S'il y a un message d'erreur affiché et que le champ
    // est valide, on retire l'erreur
    error.innerHTML = ""; // On réinitialise le contenu
    error.className = "error"; // On réinitialise l'état visuel du message
  }
}, false);
form.addEventListener("submit", function (event) {
  // Chaque fois que l'utilisateur tente d'envoyer les données
  // on vérifie que le champ email est valide.
  if (!email.validity.valid) {

    // S'il est invalide, on affiche un message d'erreur personnalisé
    error.innerHTML = "J'attends une adresse e-mail correcte, mon cher&nbsp;!";
    error.className = "error active";
    // Et on empêche l'envoi des données du formulaire
    event.preventDefault();
  }
}, false);


//sans API
// Il existe moins de méthode pour sélectionner un nœud DOM
// avec les navigateurs historiques
var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');

// Ce qui suit est une bidouille pour atteindre le prochain nœud Element dans le DOM
// Attention à cette méthode, elle peut permettre de construire une boucle
// infinie. Pour les navigateurs plus récents, on utilisera element.nextElementSibling
var error = email;
while ((error = error.nextSibling).nodeType != 1);

// Pour respecter la spécification HTML5
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// De nombreux navigateurs historiques ne supportent pas la méthode
// addEventListener. Voici une méthode simple (il en existe d'autres)
function addEvent(element, event, callback) {
  var previousEventCallBack = element["on"+event];
  element["on"+event] = function (e) {
    var output = callback(e);

    // Une fonction de rappel (callback) qui renvoie `false`
    // pour arrêter la chaîne des callback
    // et interrompre l'exécution du callback d'événement.
    if (output === false) return false;

    if (typeof previousEventCallBack === 'function') {
      output = previousEventCallBack(e);
      if(output === false) return false;
    }
  }
};

// On peut désormais reconstruire notre validation de contrainte
// Étant donné qu'on n'utilise pas la pseudo-classe CSS, il faut
// explicitement gérer la classe valid/invalid du champ e-mail
addEvent(window, "load", function () {
  // Ici, on teste si le champ est vide (rappel : le champ n'est pas obligatoire)
  // S'il ne l'est pas, on vérifie que son contenu est une adresse e-mail valide.
  var test = email.value.length === 0 || emailRegExp.test(email.value);

  email.className = test ? "valid" : "invalid";
});

// Ici, on définit ce qui se passe lorsque l'utilisateur
// saisit quelque chose dans le champ
addEvent(email, "keyup", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

// Ici, on définit ce qui se passe lorsque l'utilisateur
// tente d'envoyer les données du formulaire
addEvent(form, "submit", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);

  if (!test) {
    email.className = "invalid";
    error.innerHTML = "Merci d'écrire une adresse e-mail valide.";
    error.className = "error active";

    // Certains navigateurs historiques ne supportent pas
    // la méthode event.reventDefault()
    return false;
  } else {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }
});