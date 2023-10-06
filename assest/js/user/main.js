const next = document.getElementById("next");
const previous = document.getElementById("previous");


let users= [];
let skipTime=0;
const size = 5;

const getMaxSkips = async()=>{
    const response= await fetch(`https://dummyjson.com/users`);
    const data = await response.json();
    // console.log(Math.ceil(data.users.length/size));
    return Math.ceil(data.users.length/size);
}

const getUsers = async(i=0)=>{
    const response= await fetch(`https://dummyjson.com/users?limit=${size}&skip=${i*size}`);
    const data = await response.json();
    users=data.users;
    return data.users
    console.log(data.users);
}

const display = (AllUsers,i=0)=>{
    const users = document.getElementById('users');
    console.log(users);
    let result= "";
    AllUsers.forEach((user,index) => {
        result += `
        <tr>
   <th scope="row" class="fw-bold pt-4">${index+1+(size*i)}</th>
   <td class="fw-bold pt-4">${user.firstName}</td>
   <td class="fw-bold pt-4" >${user.lastName}</td>
   <td class="fw-bold pt-4"><img src=${user.image} width="100px" height="100px" /></td>
   <td class="fw-bold pt-4">${user.gender}</td>
   <td class="fw-bold pt-4">${user.email}</td>
   <td class="fw-bold pt-4">${user.age}</td>
   <td class="fw-bold pt-4"><button class="rounded-circle btn"><a href="updating.html?id=${user.id}"><img src="../assest/img/trolley.png" alt="" width="30px" height="30px"></a></button></td>
   <td class="fw-bold pt-4"><button class="rounded-circle btn" onclick ="del_User(${user.id
   })"><img  src="../assest/img/trash.png" width="30px" height="30px" alt=""></button></td>
 </tr>
        `
        
    });
   
    users.innerHTML=result

}
const displayData= async(skipTime)=>{
   const users= await getUsers(skipTime);
   display(users,skipTime);
}


const del_User = async(id)=>{
    
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
    
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    };

    next.addEventListener("click", async(e) => {
        e.preventDefault();
        const maxSkips = await getMaxSkips(); // 6
        console.log(maxSkips);

        if(skipTime < maxSkips-1){
          skipTime++;
          console.log(skipTime);
          next.removeAttribute('disabled');
          previous.removeAttribute('disabled');
          displayData(skipTime);
        }
        else {
          next.setAttribute('disabled', '')
        } 
      });
      console.log(skipTime)
      previous.setAttribute('disabled', '');

      previous.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(skipTime);
        if(skipTime > 0){
          skipTime--;
          previous.removeAttribute('disabled');
          next.removeAttribute('disabled');
          displayData(skipTime);
        }
       
       else {
          previous.setAttribute('disabled','')
         
          
        }})
displayData();
