'use strict'
const express = require('express');
const api = express.Router();
const {body} = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var UsuariosController = require('../controllers/usuariosController');
let AuthController = require('../controllers/authController');

let userProtectUrl = require('../middlewares/authUsuario').userProtectUrl;

api.get("/", userProtectUrl,WelcomeController.welcome);
api.get("/usuarios",userProtectUrl,  UsuariosController.usuarios);
api.get("/usuario/:filtro",userProtectUrl,  UsuariosController.usuario);
api.post("/usuario",userProtectUrl, [
                    body('usuario_id').not().isEmpty(),
                    body('nombre').not().isEmpty(),
                    body('edad').not().isEmpty(),
                    body('email').not().isEmpty(),
                    body('pass').not().isEmpty()
                ], UsuariosController.crear_usuario);
api.put("/usuario/:filtro",userProtectUrl, [
                    body('nombre').not().isEmpty(),
                    body('edad').not().isEmpty(),
                    body('email').not().isEmpty(),
                    body('pass').not().isEmpty()
                ], UsuariosController.actualizar_usuario);

api.delete("/usuario/:filtro",userProtectUrl, UsuariosController.eliminar_usuario);

api.post("/login",[
    body('email').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl,  AuthController.logout);
module.exports = api;