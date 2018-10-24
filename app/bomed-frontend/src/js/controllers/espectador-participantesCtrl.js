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
    
    
  });

  MySocket.on('conectado:alguien', function(){
   $scope.traer_participantes(); 

  });

  MySocket.on('client_disconnected', function(){
   $scope.traer_participantes(); 
    
  });

  MySocket.on('contesto_bien', function(){
    
    
  });

  MySocket.on('contesto_mal', function(){
    
    
  });


  
	

	
  MySocket.on('quite_participantes', function(){
  	$state.go('app.main.espectador');

	});



	
});