angular.module('app')
.controller('espectadorCtrl', function($scope, $anchorScroll,toastr, MySocket, $state){
  

	
	MySocket.on('llevelos_espectadoresU', function(data){
    $state.go('app.main.espectador.participantes');
  });

  MySocket.on('sc_mostrar_pregunta', function(data){
    localStorage.sc_pregunta = JSON.stringify(data.pregunta);
    $state.go('app.main.espectador.pregunta', {}, {reload: true});
  });
  
  
  MySocket.on('sc_mostrar_puesto', function(data){
    localStorage.sc_puesto = JSON.stringify(data.examen);
    $state.go('app.main.espectador.puesto', {}, {reload: true});
  });


  MySocket.on('sc_mostrar_puestos', function(data){
    MySocket.emit('Estoy_en_punto', {examenes: data.examenes});
    $state.go('app.main.espectador.puntos');
  });



	


	
});