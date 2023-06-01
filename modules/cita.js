const express = require("express");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const cita = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto NODE.JS me permite usar async/await opcion a fetch
const { error } = require("console");
const { PassThrough } = require("stream");
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
cita.use(express.json()); //serializa la data en JSON
cita.use(cors());
cita.options("*", cors());

//1.Traer las citas
cita.get("/cita", async (req, res) => {
  try {
    conex.query("select * from cita", (error, respuesta) => {
      console.log(respuesta);
      res.send(respuesta);
    });
  } catch (error) {
    console.log(error);
  }
});

//2.Insertar una Cita

cita.post("/cita", async (req, res) => {
  try {
    let data = {
      Fecha: req.body.Fecha,
      Descripcion: req.body.Descripcion,
    };

    conex.query("insert into cita set?", [data], (error, respuesta) => {
      console.log(respuesta);
      //res.send("insecion exitosa");
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//3.Editar Citas
cita.put("/cita", (req, res) => {
  let Id = req.params.Id;
  let datos = {
    Fecha: req.body.Fecha,
    Descripcion: req.body.Descripcion,
  };
  conex.query("UPDATE cita SET  ? where Id = ?", [datos, Id]),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201);
        //  res.status(201).send(respuesta)
      }
    };
});

//4. borrar cita

//borrar

cita.delete("/cita", (req, res) => {
  let Id = req.params.Id;
  conex.query("DELETE FROM cita where id = ?", Id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        //res.status(201)
        res.status(201).send(respuesta);
      }
    };
});

module.exports = cita;
