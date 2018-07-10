// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

require('dotenv').config();
const path          = require('path');
const express       = require('express');
const app           = express();
var cors            = require('cors');
var http            = require('http').Server(app);
var io              = require('socket.io')(http);
var bodyParser      = require('body-parser');

app.use(cors());
app.use(bodyParser.json()); // Para recibir json desde Angular
app.use("/app/bomed-frontend", express.static(path.join(__dirname, 'app/bomed-frontend')));
app.use("/images", express.static(path.join(__dirname, 'app/images')));
app.use('/api', require('./app/controllers/routes'));


app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/', function(req, res){
    res.writeHead(301,
        { Location: 'app/bomed-frontend/' }
    );
    res.end();
});
    


self 		  = this;
self.io 	= io;

var count_clients = 0;
var all_clts 		  = [];
var info_evento 	= {
        examen_iniciado: 		  false, 
        preg_actual: 			    0,
        free_till_question: 	-1,
        puestos_ordenados: 		true
    };


http.listen(process.env.NODE_PORT, function(){
  console.log('listening on *:'+process.env.NODE_PORT);
});





self.io.on('connection', (socket)=> {
    console.log('New connection: '+socket.id);

    count_clients++;

    datos 					= {};
    datos.logged 			= false;
    datos.registered 		= false;
    datos.resourceId		= socket.id;
    datos.categsel			= 0;
    datos.respondidas		= 0;
    datos.correctas			= 0;
    datos.tiempo			= 0;
    datos.nombre_punto		= 'Punto_' + count_clients;
    datos.user_data 		= {};
    socket.datos 			= datos;

    all_clts.push(socket.datos);

    socket.emit('te_conectaste', {datos: socket.datos});
    socket.broadcast.emit('conectado:alguien', {clt: socket.datos} );

  
  socket.on('mensaje', (data)=>{
    if (data.nombre_punto) {
        socket.datos.nombre_punto = data.nombre_punto;
    }
    if (data.registered) {
        socket.datos.registered = data.registered;
    }
    
    for(var i=0; i < all_clts.length; i++){
        if (all_clts[i].resourceId == socket.id) {
            all_clts.splice(i, 1, socket.datos);
        }
    }
    
    datos = {nombre_punto: socket.datos.nombre_punto, resourceId: socket.id, registered: socket.datos.registered };
    self.io.sockets.emit('reconocido:punto:registered', datos );
  });

  
  socket.on('disconnect', (data)=>{
    
    for (let i = 0; i < all_clts.length; i++) {

      if (all_clts[i].id == socket.id) {
        all_clts.splice(i, 1);
      }
    }
    
    self.io.sockets.emit('client_disconnected',  {sockect_id: socket.id} );
  });

  
  socket.on('traer_clientes', (data)=>{
    //console.log('Alguien escribió: Traer clientes', all_clts);
    self.io.sockets.emit('clientes_traidos', all_clts );
  });


  socket.on('empezar_examen', function(data){
    info_evento.examen_iniciado 	= true;
    info_evento.preg_actual 		= 1;

    if(data){
        if(data.puestos_ordenados){
            info_evento.puestos_ordenados 	= data.puestos_ordenados;
        }
    }
    
    socket.broadcast.emit('empezar_examen');
  });

  socket.on('empezar_examen_cliente', function(data){
      socket.broadcast.to(data.resourceId).emit('empezar_examen'); 
  });

  socket.on('set_my_examen_id', (data)=> {
      socket.datos.examen_actual_id = data.examen_actual_id;

      for (var i = 0; i < all_clts.length; i++) {
          if (all_clts[i].resourceId == socket.id) {
              all_clts.splice(i, 1, socket.datos);
          }
      }
  });

  socket.on('liberar_hasta_pregunta', function(data){
      info_evento.free_till_question 	= data.numero;
      info_evento.preg_actual 		= data.numero;
      socket.broadcast.emit('set_free_till_question', { free_till_question: data.numero }); 
  });

  socket.on('hasta_que_pregunta_esta_free', function(data){
      socket.emit('set_free_till_question', { free_till_question: info_evento.free_till_question }); 
  });

  socket.on('set_puestos_ordenados', function(data){
      console.log('set_puestos_ordenados');
      info_evento.puestos_ordenados 		= data.puestos_ordenados;
      socket.broadcast.emit('set_puestos_ordenados', { puestos_ordenados: data.puestos_ordenados }); 
  });



  socket.on('toma_mis_datos', (data)=>{
    

    for (var i = 0; i < all_clts.length; i++) {
      if (all_clts[i].id == socket.id){
        
        all_clts[i] = Object.assign({}, all_clts[i], data.usuario);
        self.io.sockets.emit('alguien_logueado', all_clts[i]);
        console.log('Alguien se logueó ' , all_clts);
      }
    }



  });


});
