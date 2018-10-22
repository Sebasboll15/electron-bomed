angular.module('app')
.controller('espectador-participantesCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
	$scope.clientes = [];
  console.log('Hola_mundo' );	
	
	$scope.mostrar_participantes = false;

	MySocket.on('llevar_participantes', function(res){
    	$scope.clientes = res;
      $scope.mostrar_participantes = true;
    	console.log('Hola_mundo', $scope.clientes );
    	

  	});

  	MySocket.on('quite_participantes', function(){
    	$state.go('app.main.espectador');

  	});



	
});