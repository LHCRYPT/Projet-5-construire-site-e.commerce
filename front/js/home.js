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
    items.appendChild(clone);
}
});

const recover = (elements) => {
    elements.forEach(element => {
        console.log(element);
        document.querySelector(".row").innerHTML +=
        <div class="col">
            <div class="card align-self-start" style="width: 18rem;">
                <img width="100%" src=' §{element.imageUrl} '>
                    <div class="card-body">
                        <p> §{element.name} </p> ><p> §{element.price/100} euros </p> §{element.description} </p>
                    </div>
            </div>
        </div>
    });
}
/* let template=document.querySelector('#produit');
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

const product1 = new Products('images/kanap01.jpeg', 'canapé bleu', 70);

//array tableau pour enregistrer une liste de produits
let products = [];

products.push(product1,product2);

console.log(products[1].pic); */