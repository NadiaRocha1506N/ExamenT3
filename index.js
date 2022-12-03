var mongodb = require ('mongoose');
var app = require('./app');
var port = process.env.PORT ||7000;

mongodb.connect('mongodb://localhost:27017/examentres',(err,res)=>{
    if(err){
        throw err
    }else{
        console.log('Conexion Exitosa con el Servidor');
        app.listen(port,function(){
            console.log('El examen esta corrieno en http://localhost:' + port);
        })
    }
})