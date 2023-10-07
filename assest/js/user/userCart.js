console.log('lllll');

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params);
const userId= params.id;
const userName = params.name;
const CartuserName = document.getElementById('CartuserName');
CartuserName.innerHTML= `${userName} Cart`
console.log(CartuserName)


const getUserCrts=async(id)=>{
    const response = await fetch(`https://dummyjson.com/users/${id}/carts`);
    const data = await response.json();
    console.log(data.carts);
    display(data.carts);


}
getUserCrts(userId);

const display= (carts)=>{

    if(carts.length == 0){
        document.querySelector('.carts').innerHTML=
        `
        <div class="text-center bg-secondary text-white py-3">
        <p>user have no cart yet</p>
        </div>
        `;

    }else{

        let result ="";
        carts.forEach(cart => {
            result += `
            <div class=" cart p-3  rounded">
            <div class="d-flex justify-content-between">
                <div>
                    <p>cart: ${cart.id}</p>
                </div>
                <div>
                    <p>user id:${cart.userId} </p>
    
                </div>
    
            </div>
            <div>
                <p>Total Discount: $${cart.discountedTotal}</p>
                <p>Total Price: $${cart.total}</p>
                <p>Total Products: ${cart.totalProducts}</p>
                <p>Total Quantity: ${cart.totalQuantity}</p>
            </div>
    
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        <th scope="col">total</th>
                        <th scope="col">discounted price</th>
    
                    </tr>
                </thead>
                <tbody id="products">
                    
                </tbody>
            </table>
            <div class="mt-5">
                <button class="btn btn-danger">Delete</button>
    
            </div>
    
        </div>
            
            `  
        });
        document.querySelector('.carts').innerHTML=result;
        displayCartProduct(carts[0].products);
    }
 

}
displayCartProduct= (products)=>{
    let result =" ";
    products.forEach((product,index)=>{
        result+= `
        <tr>
                    <th scope="row">${index+1}</th>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>${product.total}</td>
                    <td>${product.discountedPrice}</td>

                </tr>  
        `

    })
    document.getElementById('products').innerHTML=result;


}