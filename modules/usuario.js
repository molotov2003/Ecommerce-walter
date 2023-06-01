const express = require("express");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto NODE.JS me permite usar async/await opcion a fetch
const { error } = require("console");
const { PassThrough } = require("stream");
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors());
usuario.options("*", cors());


//1.Traemos los datos del usuario
usuario.get("/usuario", async (req, res) => {
    try {
      conex.query(
        "select Id,Nombre,Apellido,Email from usuario",
        (error, respuesta) => {
          console.log(respuesta);
          res.send(respuesta);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  //2.insertamos los usuarios
  usuario.post("/usuario", async (req, res) => {
    try {
      let data = {
        Nombre: req.body.Nombre,
        Apellido:req.body.Apellido,
        Email: req.body.Email,
        Password: bcrypt.hashSync(req.body.Password, 7),
      };
  
      conex.query("insert into usuarios set?", [data], (error, respuesta) => {
        console.log(respuesta);
        //res.send("insecion exitosa");
        // res.send(true);
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });


  //3.Editar o actualizar Usuarios
  usuario.put("/usuario", (req, res) => {
    let Id = req.params.Id;
    let datos = {
        Nombre: req.body.Nombre,
        Apellido:req.body.Apellido,
        Email: req.body.Email,
        Password: bcrypt.hashSync(req.body.Password, 7),
    };
    conex.query("UPDATE usuario SET  ? where id = ?", [datos,Id]),
      (error, respuesta) => {
        if (error) {
          console.log(error);
        } else {
          res.status(201);
          //  res.status(201).send(respuesta)
        }
      };
  });

  //4. Borrar
  usuario.delete("/usuario", (req, res) => {
    let Id = req.params.Id;
    conex.query("DELETE FROM usuario where id = ?", Id),
      (error, respuesta) => {
        if (error) {
          console.log(error);
        } else {
          //res.status(201)
          res.status(201).send(respuesta);
        }
      };
  });



  usuario.post("/login", async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    try {
      //validamos que llegue el email y la contraseña
      if (!Email || !Password) {
        console.log("Complete todos los campos!");
      } else {
        conex.query(
          "select * from usuarios where Email =?",
          [Email],
          async (error, respuesta) => {
            if (respuesta.length == 0 ||!(await bcrypt.compare(Password, respuesta[0].Password))
            ) { 
  
              // res.sendStatus(404)
              // res.send({estado:true,nombre:"juanito"})
            
              res.send(false)
           
            } else {
              //Enviamos las variables al front end para que cargue la paguina
              // console.log("bienvenido al sistema de informacion");
              res.send(true)
            }
          }
        );
      }
    } catch (error) {
      res.send(true);
      // console.log("error en la red");
    }
  });
  
  module.exports = usuario;