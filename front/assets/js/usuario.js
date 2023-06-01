//variables de entorno
const urlApi="http://localhost:4000/";


//DOM Login
const Email=document.querySelector("#email")
const Password=document.querySelector("#password")
const btnenviar=document.querySelector("#btnenviar")



btnenviar.addEventListener("click",(e)=>{
e.preventDefault();//previene el reenvio del formulario
fetch(urlApi+"login",{
    method:"POST",
    headers:{
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
        Email: Email.value,
        Password: Password.value,
        })
})
.then((res) => {
    
    return res.text();
  })
.then((res) => {
    console.log(res)
    if(res==="true"){
    window.location="http://127.0.0.1:5501/front/citas.html";

    }
    else{
        console.log()
        Swal.fire({
            icon: 'error',
            title: 'Falla en la validacion',
            text: 'clave o usuario erronea',
          })
    }
  });
})

//Dom Registro
const Nombre=document.querySelector("#Nombre")
const Apellido=document.querySelector("#Apellido")
const EmailRegistro=document.querySelector("#Email")
const PasswordRegistro=document.querySelector("#password")
const btnregistro=document.querySelector("#btnregistro")



btnregistro.addEventListener("click",(e)=>{
    e.preventDefault();
    fetch(urlApi+"usuario",{
        method:"POST",
        headers:{
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Nombre: Nombre.value,
            Apellido: Apellido.value,
            Email:EmailRegistro.value,
            Password:PasswordRegistro.value,
            })
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        console.log(res)
        if (res==="true") {
            Swal.fire({
                icon: 'success',
                title: 'Good...',
                text: 'Registrado Correctamente!',
              })
           
        }
    
    })
    })






