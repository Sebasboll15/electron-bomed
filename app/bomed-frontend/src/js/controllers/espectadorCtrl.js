angular.module('app')
.controller('espectadorCtrl', function($scope, $anchorScroll,toastr, MySocket, $state){
 	console.log('hola_mundo');
	
	MySocket.on('tome_participantes?', function(data){
    	$scope.data = {espectador: data, }
    	console.log('ffffff');
    	$state.go('app.main.espectador.participantes');
    	MySocket.emit('traiga_participantes', $scope.data);
    		
  	});



	
});