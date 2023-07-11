'use strict'
var controller = {
    welcome: function(req, res){
        console.log("Get ejecutado en raiz");
        res.send("Mi primer debug");
    }
};

module.exports = controller;
