console.log('kkkk')

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;


const getUserDetails = async()=>{
    const response = await fetch('https://dummyjson.com/users/1');
    const data = await response.json();
    console.log(data)
    display(data);

}
getUserDetails()

const display=(data)=>{
    const userData = document.querySelector('.userData')
    const result =`
    <div class="row">
    <div class="img col-2">
        <img src=${data.image} class='w-100' alt="">
    </div>
    <div class="col-9 info">
        <p class="text-capitalize fs-5 fw-bold">full name: ${data.firstName}+${data.maidenName} </p>
        <p class="text-capitalize fs-5 fw-bold">address:   ${data.address.address}-${data.address.city} </p>
        <p class="text-capitalize fs-5 fw-bold">birth date:   ${data.birthDate}</p>
        <p class="text-capitalize fs-5 fw-bold">phone:  ${data.phone} </p>
        <p class="text-capitalize fs-5 fw-bold">email:  ${data.email} </p>
        <p class="text-capitalize fs-5 fw-bold">univercity: ${data.university}</p>

    </div>
</div>
    
    `
    userData.innerHTML=result

}