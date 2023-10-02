

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const name_input=document.getElementById('exampleInputName');
const price_input=document.getElementById('exampleInputPrice');
const input_stock=document.getElementById('exampleInputStock');
const input_category=document.getElementById('exampleInputCategory');
const input_rating=document.getElementById('exampleInputRating');
const title=document.querySelector('.title');
const imgs= document.querySelector('.imgs ');
const update_btn=document.getElementById('update_btn');
const image =document.getElementById('image')


const productId=params.id;
console.log(productId);

let products=[];
let UpdatedProduct;
const findProduct=(products)=>{
    for(const product of products){
        if(product.id==productId){
            UpdatedProduct=product;
            break;
        }
    }

}

const getAllProducts =async()=>{
    const response = await fetch(`https://dummyjson.com/products`);
    const data = await response.json();
    products=data.products;
    findProduct(products);
    fillData();
    console.log(products);
    console.log(UpdatedProduct)

}
getAllProducts();

const fillData= ()=>{
name_input.value = UpdatedProduct.title;
price_input.value=UpdatedProduct.price;
input_category.value=UpdatedProduct.category;
input_rating.value=UpdatedProduct.rating;
input_stock.value=UpdatedProduct.stock;
title.innerHTML=`<h2> Updating ${UpdatedProduct.title}</h2>`;
fill_img()
}

fill_img = ()=>{
    let result="";
    UpdatedProduct.images.forEach(img => {
        result += `
        <div class="col-3">
            <img src=${img} alt="" class="img-fluid"  />
        </div>
        ` 
    });
    imgs.innerHTML=result;
}

const update_Product = ()=>{

UpdatedProduct.title =  name_input.value;
UpdatedProduct.price= price_input.value;
UpdatedProduct.category =input_category.value;
UpdatedProduct.rating = input_rating.value;
UpdatedProduct.stock= input_stock.value;
UpdatedProduct.images = image.files[0];

}
const clear = ()=>{
    input_category.value= " " 
    image.value= ""
    price_input.value =""
    input_rating.value =""
     input_stock.value =""
     name_input .value= ""
    
    }
update_btn.addEventListener('click',async(e)=>{
    e.preventDefault();
    update_Product();
    console.log(image.files[0]);
    console.log(UpdatedProduct);
Swal.fire({
  title: 'Do you want to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
}).then(async(result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    const response = await fetch(`https://dummyjson.com/products/${UpdatedProduct.id}`, {
        method: 'PUT', /* or PATCH */
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {UpdatedProduct} )
    });
    console.log( await response.json());
    clear();
    Swal.fire('Saved!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})
})