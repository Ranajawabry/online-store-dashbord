console.log('kkkk')

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;


const getUserDetails = async () => {
    const response = await fetch('https://dummyjson.com/users/1');
    const data = await response.json();
    console.log(data)
    display(data);

}
getUserDetails()

const display = (data) => {
    const title = document.querySelector('.title');
    title.innerHTML = `${data.firstName} Portfolio`;
    const userData = document.querySelector('.userData')
    const result = `
    <div class="row">
    <div class="img col-3">
        <img src=${data.image} class='w-100' alt="">
    </div>
    <div class="col-9 info">
        <p class="text-capitalize fs-5 fw-bold">full name: <span class=" text-secondary">${data.firstName}+${data.maidenName}</span> </p>
        <p class="text-capitalize fs-5 fw-bold">address:  <span class=" text-secondary"> ${data.address.address}-${data.address.city}</span> </p>
        <p class="text-capitalize fs-5 fw-bold">birth date: <span class=" text-secondary">  ${data.birthDate}</span></p>
        <p class="text-capitalize fs-5 fw-bold">phone: <span class=" text-secondary">  ${data.phone}</span></p>
        <p class="text-capitalize fs-5 fw-bold">email: <span class=" text-secondary"> ${data.email}</span> </p>
        <p class="text-capitalize fs-5 fw-bold">univercity: <span class=" text-secondary"> ${data.university}</span></p>
        <p class="text-capitalize fs-5 fw-bold">gender: <span class=" text-secondary"> ${data.gender}</span></p>
        <p class="text-capitalize fs-5 fw-bold">company: <span class=" text-secondary"> ${data.company.name}--${data.company.department}--${data.company.title}</span></p>



    </div>
</div>
    
    `
    userData.innerHTML = result

}

const deleteToken = () => {
    console.log('llll')
    localStorage.removeItem('token')
}

if(window.location.pathname === '/pages/signin.html' && localStorage.getItem('token')){

    window.location  = `profile.html?id=${id}`
  }