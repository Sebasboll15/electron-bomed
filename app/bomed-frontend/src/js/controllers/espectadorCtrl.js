angular.module('app')
.controller('espectadorCtrl', function($scope, $anchorScroll,toastr, MySocket, $state){

	MySocket.emit('Espectador:Ya_estoy_aqui');
	
	MySocket.on('llevelos_espectadores', function(data){
    	$state.go('app.main.espectador.participantes');
  	});


	


	
});