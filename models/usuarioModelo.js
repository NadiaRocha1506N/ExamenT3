var mongoose = require('mongoose'); 
var Shema = mongoose.Schema;

var ShemaUsuario = Shema({
    nombre:String,
    apellidoPa:String,
    apellidoMa:String,
    edad:Number,
    telefono:Number,
    sexo:String,
    correo:String,
    carrera:String,
    semestre:String,
    
});
module.exports=mongoose.model('NuevoUsuario',ShemaUsuario);