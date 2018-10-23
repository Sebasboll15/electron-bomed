angular.module('app')
.controller('espectador-participantesCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
	$scope.participantes         = [];
  $scope.prueba_actual         = {}; 
  $scope.mostrar_participantes = false;
  $scope.traer_participantes = function(){
    
    MySocket.emit('traer_participantes'); 

  };


  $scope.traer_participantes();	

  MySocket.on('llevar_participantes', function(data){
    $scope.mostrar_participantes = true;
    $scope.participantes = data;
    console.log('data.participantes', $scope.participantes);  
    $scope.traer_participantes();
    
  });

	

	
  MySocket.on('quite_participantes', function(){
  	$state.go('app.main.espectador');

	});



	
});