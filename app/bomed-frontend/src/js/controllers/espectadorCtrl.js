angular.module('app')
.controller('espectadorCtrl', function($scope, $anchorScroll,toastr, MySocket, $state){
 	console.log('hola_mundo');
	
	MySocket.on('tome_participantes', function(){
    	
    	console.log('ffffff');
    	$state.go('app.main.espectador.participantes');
    		
  	});



	
});