
const products =document.getElementById('products');
const next= document.getElementById('next');
const previous= document.getElementById('previous');
const seachPro = document.getElementById('seachPro');

let Allproducts=[];
const size =5;
let skipTime=0;
let maxSkips;
let PRO_NO;

const products_no =async()=>{
    const response = await fetch(`https://dummyjson.com/products`);
    const data = await response.json();
    Allproducts=data.products;
    // console.log(Allproducts);
    maxSkips=Math.floor(Allproducts.length/size);
    // console.log(maxSkips);
    return data.products.length;

}

products_no();


const getProduct =async(i)=>{
    let skip = 5*i
    const response = await fetch(`https://dummyjson.com/products?limit=${size}&skip=${skip}`);
    const data = await response.json();
    // console.log(data.products);
    Allproducts=data.products;
    // PRO_NO= Allproducts.length;
    // console.log(Allproducts.length);
   

    displayProduct(data.products,i);
}

const displayProduct=(data,i=0)=>{
let result = "" ;
data.forEach((element,index) => {
   result += `
   <tr>
   <th scope="row" class="fw-bold pt-4">${index+1+(size*i)}</th>
   <td class="fw-bold pt-4">${element.title}</td>
   <td class="fw-bold pt-4"><img src=${element.images[0]} width="100px" height="100px" /></td>
   <td class="fw-bold pt-4" >${element.price}$</td>
   <td class="fw-bold pt-4">${element.stock}</td>
   <td class="fw-bold pt-4">${element.rating}</td>
   <td class="fw-bold pt-4">${element.category}</td>
   <td class="fw-bold pt-4"><button class="rounded-circle btn"><a href="updating.html?id=${element.id}"><img src="assest/img/edit.png" alt="" width="30px" height="30px"></a></button></td>
   <td class="fw-bold pt-4"><button class="rounded-circle btn" onclick = "del_Product(${element.id})"><img src="assest/img/trash.png" width="30px" height="30px" alt=""></button></td>
 </tr>
   `
});
products.innerHTML=result;
}

;

getProduct(skipTime=0);

next.addEventListener('click',(e)=>{
    e.preventDefault();
    skipTime++;
    // console.log(skipTime);
    if(skipTime > maxSkips){
        getProduct(maxSkips);
    }else{
        getProduct(skipTime);
    }
    
})
previous.addEventListener('click',(e)=>{
    e.preventDefault();
    skipTime--;
    if(skipTime==0){
        getProduct(skipTime=1) 
    }else{
        getProduct(skipTime)

    }
})
const del_Product=async(id)=>{
    //console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
      })
      console.log(await response.json())
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    
}
/////////////////////////////
const debounce = (func, timeout = 500) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, timeout);
  };
};



const searchInput = async()=>{
   
    if(seachPro.value != ""){
      console.log(seachPro.value)
      const response = await fetch(`https://dummyjson.com/products/search?q=${seachPro.value}`);
      const data =await response.json();
      console.log(data);
      displayProduct(data.products);
    }
  
}

const debounceSearch = debounce(searchInput, 800);
seachPro.addEventListener("keyup", debounceSearch);