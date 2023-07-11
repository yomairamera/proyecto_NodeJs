'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ProjectNode',{ useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
            console.log('Conexión a la base de datos establecida con éxito');

            var server = app.listen(port, () => {
                console.log("Servidor de ejemplo ejecuntando en http://localhost:" + port)
                });
        })
        .catch(err => console.log(err));
