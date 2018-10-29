angular.module('app')
.controller('espectadorCtrl', function($scope, $anchorScroll,toastr, MySocket, $state){

	MySocket.emit('Espectador:Ya_estoy_aqui');
	
	MySocket.on('llevelos_espectadoresU', function(data){
    	$state.go('app.main.espectador.participantes');
  	});

  	MySocket.on('llevelos_espectadoresP', function(data){
    	$state.go('app.main.espectador.pregunta');
  	});


	


	
});