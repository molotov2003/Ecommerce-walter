const express = require("express");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const contacto = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto NODE.JS me permite usar async/await opcion a fetch
const { error } = require("console");
const { PassThrough } = require("stream");
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
contacto.use(express.json()); //serializa la data en JSON
contacto.use(cors());
contacto.options("*", cors());


//1.Traer los contactos 
contacto.get("/contacto", async (req, res) => {
    try {
      conex.query(
        "select Id, Nombre,Apellido,Apellido2,Telefono,Email,Fecha_nace from contacto",
        (error, respuesta) => {
          console.log(respuesta);
          res.send(respuesta);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
//2.Insertar Contactos
  contacto.post("/contacto", async (req, res) => {

    try {
      let data = {
        Nombre: req.body.Nombre,
        Apellido:req.body.Apellido,
        Apellido2:req.body.Apellido2,
        Telefono:req.body.Telefono,
        Email:req.body.Email,
        Fecha_nace:req.body.Fecha_nace,
      };
  
      conex.query("insert into contacto set?", [data], (error, respuesta) => {
        console.log(respuesta);
        //res.send("insecion exitosa");
        res.send(true);
        
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });

  //3.Editar Contacto

  contacto.put("/contacto", (req, res) => {
    let Id = req.params.Id;
    let datos = {
        Nombre: req.body.Nombre,
        Apellido:req.body.Apellido,
        Apellido2:req.body.Apellido2,
        Telefono:req.body.Telefono,
        Email: req.body.Email,
        Fecha_nace: req.body.Fecha_nace,
    };
    conex.query("UPDATE contacto SET  ? where Id = ?", [datos, Id]),
      (error, respuesta) => {
        if (error) {
          console.log(error);
        } else {
          res.status(201);
          //  res.status(201).send(respuesta)
        }
      };
  });

  //4.Borrar
  contacto.delete("/contacto", (req, res) => {
    let Id = req.params.Id;
    conex.query("DELETE FROM contacto where id = ?", Id),
      (error, respuesta) => {
        if (error) {
          console.log(error);
        } else {
          //res.status(201)
          res.status(201).send(respuesta);
        }
      };
  });

  module.exports=contacto