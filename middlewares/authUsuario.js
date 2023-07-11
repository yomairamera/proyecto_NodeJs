'use strict'

const jwt = require('jsonwebtoken');
var Sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next){
        const  token = req.headers['access-token'];
        if (token){
            jwt.verify(token, 'PLUcNrIeLtGheIubdl99j8yA8xYNU46jsB0UQ505jg5wqp1uO2', (err, decoded)=>{
                if (err) {
                    return res.status(403).json({message: 'Token no válida'});
                }else{
                    req.decoded = decoded;

                    Sessions.findOne({usuario_id: req.decoded.usuario_id, jwt_info: token}).exec((err, session)=>{
                        if (err) return res.status(500).send({message: 'Error al devolver los datos'});
                        if (!session) return res.status(404).send({message: 'Los datos de autentificación no son válidos'});
                        
                        next();
                    });

                }
            });

        }else{
            res.status(403).send({
                message: 'Token no válido'
            });
        }
    }
};

module.exports = middlewares;
