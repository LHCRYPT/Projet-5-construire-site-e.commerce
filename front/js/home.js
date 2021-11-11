//console.log('coucou');
let template=document.querySelector('#produit');
let items=document.querySelector('#items');
// Clone the new row and insert it into the table
let clone = template.content.cloneNode(true);
//je viens alimenter la div items avec le template
let nom='produit.name';
clone.querySelector('.productName').innerHTML=nom;
items.appendChild(clone);

