const name_input=document.getElementById('exampleInputName');
const price_input=document.getElementById('exampleInputPrice');
const input_stock=document.getElementById('exampleInputStock');
const input_category=document.getElementById('exampleInputCategory');
const input_rating=document.getElementById('exampleInputRating');
const InputDescription= document.getElementById('InputDescription');
const add_btn=document.getElementById('add_btn');
const image =document.getElementById('image')
console.log(add_btn);


const newProduct ={

category: input_category.value ,
description: InputDescription.value ,
image : image.files ,
price: price_input.value ,
rating :input_rating.value ,
stock: input_stock.value , 
title: name_input .value

}

addProduct = async(newProduct)=>{
  const response = await fetch('https://dummyjson.com/products/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    newProduct
  })
})
const data =await response.json();
console.log(data);
}
const clear = ()=>{
input_category.value= "" 
 InputDescription.value = ""
image.value= ""
price_input.value =""
input_rating.value =""
 input_stock.value =""
 name_input .value= ""

}
add_btn.addEventListener('click',(e)=>{

    e.preventDefault();
    addProduct(newProduct);
    Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Your product has been added',
        showConfirmButton: false,
        timer: 1500
      })

      clear()

    console.log('kooo')

})
