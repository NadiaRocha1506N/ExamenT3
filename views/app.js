const express = require ('express');
const { config, engine } = require('express-edge');
const bodyParser = require ('body-parser');
const User = require('./models/usuarioModelo');// instanciar el modelo 

const app = new express();

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Rutas paginas
//Jalar los datos d ela base con find y enpasularlos en una variable ususarios que vamos a a mandar el archivo index
app.get ('/', async(req,res)=>{
    const usuarios = await User.find({});
    res.render('index',{usuarios});
});
//ruta que nos mostrara el formulario en donde se registraran los datos.
app.get ('/ingresar',(req,res)=>{
    res.render('ingresar')
});
//ruta a la que el formaulario de ingresar, mandar los datos para que se registren con la ayuda de create
app.post('/ingresar/guardar',(req,res)=>{
    var params = req.body;//recibe los datos del formulario
    User.create(params,(err,usuario)=>{
        if (err){
            res.status(500).send({message : err});
        }else{
            console.log(params);
            res.status(200).redirect('/');
        }
    });
});
//ruta para mostrar los datos del usuario mas a detalle
app.get ('/usuario/:id',async(req,res)=>{
    const usuario= await User.findById(req.params.id);
    res.render('usuario',{usuario});
});
//ruta hacia del boton editar para auwe muetre el formuloario con los datos  de la persona 
app.get ('/editar/:id', async(req,res)=>{
    const usuario = await User.findById(req.params.id);
    res.render('editar',{usuario});
});
//ruta que al presionar el  boton del formulario,guarde y actualize los cambios 
app.post('/editar/guardar',(req,res)=>{
    const usuarioid = req.body.id;//llamar los datos con id 
    var nuevo = req.body;//requiere los datos d el formulario
    User.findByIdAndUpdate(usuarioid,{
        nombre:nuevo.nombre,
        apellidoPa : nuevo.apellidoPa,
        apellidoMa : nuevo.apellidoMa,
        edad: nuevo.edad,
        telefono : nuevo.telefono,
        sexo:nuevo.sexo,
        correo:nuevo.correo,
        carrera:nuevo.carrera,
        semestre : nuevo.semestre
    }, (err,usuarioAct)=>{
        console.log(nuevo);
        console.log(`Actualisaste los datos del id: ${usuarioid} y ahora estos son los nuevos datos ${usuarioAct}`)
        res.redirect('/');//redirecciona a la pagina principal
    });
});
//ruta para que muestre los datos que va a eliminar en un formulario 
app.get ('/borrar/:id', async(req,res)=>{
const usuario = await User.findById(req.params.id);
res.render('borrar',{usuario});
})
//al precionar el boton de borrar, esos datos que trajo lo eliminara, gracias a que se crea una constante
app.post('/borrar',(req,res)=>{
    const usuarioid = req.body.id;//constante que lmacena el id y con el eliminar el registro
    User.findByIdAndRemove(usuarioid, function (err){//eliminar con Remove 
    if(err){
        res.send(err);
    }else{
        console.log(`Usuario eliminado con el id:${usuarioid}`)
        res.redirect('/');
    }
    });
});
module.exports = app;