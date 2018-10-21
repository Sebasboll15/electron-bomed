angular.module('app')
.controller('espectador-participantesCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket){
	$scope.clientes = [];	
	
	$scope.mostrar_participantes = false;

	MySocket.on('tome_participantes', function(res){
    	$scope.clientes = res;
    	console.log('Hola_mundo', $scope.clientes );
    	$scope.mostrar_participantes = true;

  	});

  	MySocket.on('quite_participantes', function(){
    	$scope.mostrar_participantes = false;

  	});



	
});