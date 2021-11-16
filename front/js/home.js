//console.log('coucou');
let template=document.querySelector('#produit');
let items=document.querySelector('#items');
// Clone the new row and insert it into the table
let clone = template.content.cloneNode(true);
//je viens alimenter la div items avec le template
let nom='produit.name';
clone.querySelector('.productName').innerHTML=nom;
items.appendChild(clone);

//plan qui détaille le produit nom des produits et leurs prix. 
//On met un P majuscule car c'est un objet
function Products(pic,name,price){
    this.pic = pic,
    this.name = name,
    this.price = price
}

//array tableau pour enregistrer une liste de produits
let products = [];

products.push(product,product2);

console.log(products[1].name);