var express = require('express');
var router = express.Router();

/* GET users listing. */
// simular base de datos
var tablaLibros={'id':1 ,'titulo':'el perfume','autor':'patrick suskind'};
var tablaLibros2= [
                  {'id':1 ,'titulo':'el perfume','autor':'patrick suskind'},
                  {'id':2 ,'titulo':'el hobit','autor':'tolkin'},
                  {'id':3 ,'titulo':'la biblia','autor':'apostoles'}
                  ];

router.get('/', function(req, res, next) {
  // aqui se realiza la consulta a bd
  res.status(200).json(tablaLibros2);
});

router.get('/:idLibro',(req,res,next)=>{
  var id=req.params.idLibro;
  res.status(200).json(tablaLibros2[id-1]);

} );

router.post('/:idLibro',(req,res,next)=>{
  res.status(400).json({'error':'operacion no permitida'});

});

router.post('/',(req,res,next)=>{
  console.log(req.body);
  var libro={
    'id':tablaLibros2[tablaLibros2.length-1]['id']+1,
    'titulo':req.body.titulo,
    'autor':req.body.autor
  };

  // insert en bd del objeto libro
  tablaLibros2.push(libro);
  //la respuesta de bd  regresarla a el cliente
  res.status(200).json(tablaLibros2[tablaLibros2.length-1]);
});


router.patch('/:idLibro', (req,res,next)=>{
  var id=req.params.idLibro;// esto nos da el id del libro
  //   tablaLibros2[req.body.id]['titulo']=req.body.titulo; manera alternativa desde el cuerpo
  //en bd relacional-->update libro set libro=...
  tablaLibros2[id-1]['titulo']=req.body.titulo;
  tablaLibros2[id-1]['autor']=req.body.autor;
  res.status(200).json({'mensaje':'actualizado'});

});


module.exports = router;
