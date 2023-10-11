const name= document.getElementById('name');
const password= document.getElementById('password');
const form =document.getElementsByTagName('form')[0];
// console.log(form)
let userName;
let userPassword

const getName= ()=>{
    // console.log(email.value);
    userName = name.value;
}
const getPassword= ()=>{
    // console.log(password.value)
    userPassword=password.value;
}

name.addEventListener('keyup',getName);
password.addEventListener('keyup',getPassword);
// console.log(password);

const signIn= async()=>{
  // const user ={
  //   username:userName ,
  //   password:userPassword
  // }
  // console.log(user)
   const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      
      username: 'kminchelle',
      password: '0lelplR',
      // expiresInMins: 60, // optional
    })
  })
const data = await response.json();
console.log(data.token);
const token = data.token;
if(token){
  localStorage.setItem('token',token);
  
}



}




form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log(userPassword);
    await signIn();
    
})

