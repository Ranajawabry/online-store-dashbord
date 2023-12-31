const name= document.getElementById('name');
const password= document.getElementById('password');
const form =document.getElementsByTagName('form')[0];
// console.log(form)
let userName;
let userPassword;
let id;

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
console.log(decodeToken(data.token))
const token = data.token;
id=decodeToken(data.token).id
if(token){
  setCookie('token', token, 1) 
  // localStorage.setItem('token',token);
  window.location  = `profile.html?id=${id}`
}

}


form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log(userPassword);
    await signIn();
    
})

if(window.location.pathname === '/pages/signin.html' && getCookie("token")){
  
  window.location  = `profile.html?id=${id}`
}

const decodeToken=(token)=>{

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

//////////set data in cookie////////
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  console.log(d.toUTCString())
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/////////////get data from cookie//////
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}