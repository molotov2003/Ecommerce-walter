//variables de entorno
const urlApi="http://localhost:4000/";

const on =(Element,event,selector,handler)=>{
  Element.addEventListener(event,(e)=>{
    if (e.target.closest(selector)) {
      handler(e)
    }
  })
}

//Dom registro Contacto

const NombreContacto=document.querySelector("#NombreContacto")
const ApellidoContacto=document.querySelector("#ApellidoContacto")
const ApellidoContacto2=document.querySelector("#ApellidoContacto2")
const TelefonoContacto=document.querySelector("#TelefonoContacto")
const EmailContacto=document.querySelector("#EmailContacto")
const FechaContacto=document.querySelector("#FechaContacto")
const btnRegistroContacto=document.querySelector("#btnRegistroContacto")

//Dom actualizar
const NombreContactoActualizar=document.querySelector("#NombreContactoActualizar")
const ApellidoContactoActualizar=document.querySelector("#ApellidoContactoActualizar")
const ApellidoContacto2Actualizar=document.querySelector("#Apellido2ContactoActualizar")
const TelefonoContactoActualizar=document.querySelector("#TelefonoContactoActualizar")
const EmailContactoActualizar=document.querySelector("#EmailContactoActualizar")
const FechaContactoActualizar=document.querySelector("#FechaContactoActualizar")
const btnRegistroContactoActualizar=document.querySelector("#ActualizarContacto")


//Evento actualizar
btnRegistroContactoActualizar.addEventListener("click",(e)=>{
  e.preventDefault()
  fetch(urlApi+"contacto",{
    method:"PUT",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Nombre:NombreContactoActualizar.value,
      Apellido:ApellidoContactoActualizar.value,
      Apellido2:ApellidoContacto2Actualizar.value,
      Telefono: TelefonoContactoActualizar.value,
      Email: EmailContactoActualizar.value,
      Fecha_nace:FechaContactoActualizar.value,
      })
  })
  .then((res)=>{
    return res.json()
  })
  .then((res=>{

  })
    
  )
})





//Evento registro contacto
btnRegistroContacto.addEventListener("click",(e)=>{
    e.preventDefault();//previene el reenvio del formulario
    fetch(urlApi+"contacto",{
        method:"POST",
        headers:{
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Nombre:NombreContacto.value,
            Apellido:ApellidoContacto.value,
            Apellido2:ApellidoContacto2.value,
            Telefono: TelefonoContacto.value,
            Email: EmailContacto.value,
            Fecha_nace:FechaContacto.value,
            })
    })
    .then((res) => {
      if (NombreContacto || ApellidoContacto || ApellidoContacto2 || TelefonoContacto|| EmailContactoActualizar || FechaContacto=="") {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Datos vacios',
        })
      }else{
        if(res==="true"){
          Swal.fire({
              icon: 'success',
              title: 'Good',
              text: 'Contacto Actualizado Correctamente',
            })
  
      }
      else{
          
          Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: 'Problema al Actualizar el contacto',
            })
      }
    }
        return res.text();
      })
    .then((res) => {
        console.log(res)
        if (NombreContacto || ApellidoContacto || ApellidoContacto2 || TelefonoContacto || EmailContacto || FechaContacto=="") {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Datos vacios',
          })
        }else{
          if(res==="true"){
            Swal.fire({
                icon: 'success',
                title: 'Good',
                text: 'Contacto ingresado Correctamente',
              })
    
        }
        else{
            
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Problema al registrar el contacto',
              })
        }
        }
       










fetch(urlApi+"contacto")
.then((res)=>{
  return res.json()
})
.then((res)=>{
    const Tabla=document.querySelector("#table")
    const thead = document.createElement("thead");
    const tr1 = document.createElement("tr");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const th3 = document.createElement("th");
    const th4 = document.createElement("th");
    const th5 = document.createElement("th");
    const th6 = document.createElement("th");
    const th7 = document.createElement("th");
    const th8 = document.createElement("th");
    const th9 = document.createElement("th");

    th1.innerHTML = "id:";
    th2.innerHTML = "nombre:";
    th3.innerHTML = "apellido:";
    th4.innerHTML = "Segundo apellido: ";
    th5.innerHTML = "Telefono ";
    th6.innerHTML = "Email";
    th7.innerHTML = "Fecha Nacimiento";
    th8.innerHTML = "Editar";
    th9.innerHTML = "Borrar";

    const tabla = document.createElement("table");
    tabla.appendChild(thead);
    thead.appendChild(tr1);
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    tr1.appendChild(th4);
    tr1.appendChild(th5);
    tr1.appendChild(th6);
    tr1.appendChild(th7);
    tr1.appendChild(th8);
    tr1.appendChild(th9);

    for (let index = 0; index < res.length; index++) {
      const btnActualizar=document.createElement("button")
      const btnBorrar=document.createElement("button")

btnActualizar.innerHTML="Actualizar";
btnBorrar.innerHTML="Borrar";
btnActualizar.setAttribute("class","btn btn-success");
btnActualizar.setAttribute("data-bs-toggle","modal");
btnActualizar.setAttribute("data-bs-target","#ActualizarContacto");
btnBorrar.setAttribute("class","btn btn-danger");
      const cuerpo = document.createElement("tbody");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      const td5 = document.createElement("td");
      const td6 = document.createElement("td");
      const td7 = document.createElement("td");
      const td8 = document.createElement("td");
      const td9 = document.createElement("td");
      const tr2 = document.createElement("tr");

      td1.innerHTML = res[index].Id;
      td2.innerHTML = res[index].Nombre;
      td3.innerHTML = res[index].Apellido;
      td4.innerHTML = res[index].Apellido2;
      td5.innerHTML = res[index].Telefono;
      td6.innerHTML = res[index].Email;
      td7.innerHTML = res[index].Fecha_nace;
      td8.appendChild(btnActualizar)
      td9.appendChild(btnBorrar)
      

      // img.setAttribute("src", respuesta[index].Foto);

      tabla.setAttribute("class", "table table-striped");
      tabla.appendChild(cuerpo);
      cuerpo.appendChild(tr2);
      tr2.appendChild(td1);
      tr2.appendChild(td2);
      tr2.appendChild(td3);
      tr2.appendChild(td4);
      tr2.appendChild(td5)
      tr2.appendChild(td6)
      tr2.appendChild(td7)
      tr2.appendChild(td8)
      tr2.appendChild(td9)
      // td4.appendChild(img);
    }

    Tabla.appendChild(tabla);
  

})
      });
    })