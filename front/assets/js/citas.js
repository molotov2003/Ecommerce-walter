//variables de entorno
const urlApi = "http://localhost:4000/";

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
//DOM Login

const FechaCita = document.querySelector("#FechaCita");
const Descripcion = document.querySelector("#Descripcion");
const btnenviar = document.querySelector("#btnenviar");

btnenviar.addEventListener("click", (e) => {
  e.preventDefault(); //previene el reenvio del formulario
  fetch(urlApi + "cita", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Fecha: FechaCita.value,
      Descripcion: Descripcion.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      console.log(res);
      if (res === "true") {
        window.location = "http://127.0.0.1:5501/front/citas.html";
      } else {
        console.log(res);
        s;
      }
    });
});

fetch(urlApi + "cita")
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((respuesta) => {
    const tabla = document.querySelector("#tabla");

    for (let index = 0; index < respuesta.length; index++) {
      const btnActualizart = document.createElement("button");
      const btnEliminar = document.createElement("button");
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td4 = document.createElement("td");
      const td5 = document.createElement("td");

      btnActualizart.innerHTML = "Actualizar";
      btnEliminar.innerText = "Eliminar";
      btnEliminar.setAttribute("class", "btn btn-danger");
      btnActualizart.setAttribute("class", "btn btn-success");
      btnActualizart.setAttribute("data-bs-toggle", "modal");
      btnActualizart.setAttribute("data-bs-target", "#ActualizarCita");
      td.innerHTML = respuesta[index].Id;
      td1.innerHTML = respuesta[index].Fecha;
      td2.innerHTML = respuesta[index].Descripcion;

      td4.appendChild(btnActualizart);
      td5.appendChild(btnEliminar);
      tr.append(td, td1, td2, td4, td5);

      tabla.appendChild(tr);
    }
  });

const btnActualizar = document.querySelector("#btnActualizar");
const btnregistro = document.querySelector("#btnregistro");
const FechaCitaa = document.querySelector("#FechaCitaa");
const DescripcionCitaa = document.querySelector("#DescripcionCitaa");

btnActualizar.addEventListener("click", (e) => {
  e.preventDefault(); //previene el reenvio del formulario
  fetch(urlApi + "cita", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Fecha: FechaCitaa.value,
      Descripcion: DescripcionCitaa.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      console.log(res);
      if (res === "true") {
        window.location.reload();
      } else {
        console.log(res);
      }
    });
});
