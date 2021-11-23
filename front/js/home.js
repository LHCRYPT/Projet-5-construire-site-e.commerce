let url = "http://localhost:3000/api/products/";
fetch(url)
.then(response=>response.json())
.then(data=>{
    for(let p of data){ 
    let template=document.querySelector('#produit');
    let items=document.querySelector('#items');
    // Clone the new row and insert it into the table
    let clone = template.content.cloneNode(true);
    //je viens alimenter la div items avec le template
    let nom=p.name;
    clone.querySelector('.productName').innerHTML=nom;
    clone.querySelector('.imgName').setAttribute('src',p.imageUrl);
   
    clone.querySelector('.productDescription').innerHTML=p.description;
    let href = './product.html?id='+p._id;
    clone.querySelector('.lien').setAttribute('href',href);
    items.appendChild(clone);
}
});



