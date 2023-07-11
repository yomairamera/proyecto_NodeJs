'use strict'

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
var Usuarios = require('../models/usuarios')
const bc_salt_round = 10;

var controller = {
    usuarios: function (req, res){
        Usuarios.find({}).exec((err, usuarios)=>{
                    if (err) return res.status(500).json({ status: 500,  mensaje: err  });
                    if (!usuarios) return res.status(200).json({ status: 200,  mensaje: "No hay usuarios" });
                    console.log(usuarios);
                    return res.status(200).json({
                        status: 200,
                        data: usuarios
                    });
        });
    },

    usuario: function (req, res){
        let filtro = req.params.filtro;
        console.log(filtro);
        Usuarios.findOne({usuario_id:  filtro}).exec((err, usuario)=>{
            if (err) return res.status(500).json({ status: 500,  mensaje: err  });
            if (!usuario) return res.status(200).json({ status: 200,  mensaje: "No se encontró el usuario" });
            console.log(usuario);
            return res.status(200).json({
                status: 200,
                data: usuario
            }); 
        });
    },

    crear_usuario: function (req, res){
        //Validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        let info_usuario = req.body;

        Usuarios.findOne({usuario_id:  info_usuario.usuario_id}).exec((err, usuario)=>{
            if (err) return res.status(500).json({ status: 500,  mensaje: err  });
            if (usuario) return res.status(200).json({ status: 200,  mensaje: "Ya existe el usuario." });

            let usuario_model = new Usuarios;
            usuario_model.usuario_id = info_usuario.usuario_id;
            usuario_model.nombre = info_usuario.nombre;
            usuario_model.email = info_usuario.email;
            usuario_model.edad = info_usuario.edad;
            //usuario_model.pass = info_usuario.pass;
            const new_hash = bcrypt.hashSync(info_usuario.pass, bc_salt_round);
            console.log(new_hash);
            usuario_model.pass = new_hash;

            usuario_model.save((err, usuarioStored)=>{
                if (err) return res.status(500).json({ status: 500,  mensaje: err  });
                if (!usuarioStored) return res.status(200).json({ status: 200,  mensaje: "Error al guardar usuario" });
                
            });

            return res.status(200).json({
                status: 200,
                message: "Usuario Almacenado"
            });
        });

    },


    actualizar_usuario: function (req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        let filtro = req.params.filtro;
        let info_usuario = req.body;

        let info_usuario_update = {
            nombre: info_usuario.nombre,
            edad: info_usuario.edad,
            email: info_usuario.email, 
            pass: info_usuario.pass
        };

        Usuarios.findOneAndUpdate({usuario_id: filtro},info_usuario_update,{new:true} , (err, usuarioUpdate)=>{
            if (err) return res.status(500).json({message: 'Error al actualizar.'});
            if (!usuarioUpdate) return res.status(404).json({message: 'No existe el usuario.'});

            return res.status(200).json({
                nombre: usuarioUpdate.nombre,
                edad: usuarioUpdate.edad,
                email: usuarioUpdate.email, 
                pass: usuarioUpdate.pass
            })
        });
        console.log(info_usuario);
    },

    eliminar_usuario: function(req, res){
        console.log(req.params.filtro);
        let filtro = req.params.filtro;
        if (!req.params) return res.status(400).json({message: 'Por favor, agregar el ID del usuario a eliminar'}); 
        Usuarios.findOneAndRemove({usuario_id: filtro}, (err, usuarioEliminar)=>{
            if (err) return res.status(500).json({message: 'Error al eliminar.'});
            if (!usuarioEliminar) return res.status(404).json({message: 'No se puede eliminar un usuario inexistente.'});
            
            return res.status(200).json({
                status: 200,
                message: "Usuario Eliminado"
            });
        });
    }

};

module.exports = controller;