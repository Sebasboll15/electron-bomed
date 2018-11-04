angular.module('app')
.controller('espectador-participantesCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  MySocket.emit('estoy_en_part');

  $scope.clientes        = [];
  $scope.prueba_actual   = {};

  $scope.mostrar_participantes = false;
  $scope.traer_participantes = function(){
    
    MySocket.emit('traer_participantes'); 

  };


  $scope.traer_participantes();	

  MySocket.on('llevar_participantes', function(data){
    $scope.mostrar_participantes = true;
    $scope.clientes = data;
    console.log('data.participantes', $scope.clientes);  
    
    
  });

  MySocket.on('conectado:alguien', function(){
   $scope.traer_participantes(); 

  });

  MySocket.on('client_disconnected', function(){
   $scope.traer_participantes(); 
    
  });

  MySocket.on('respondido', function(datos){
    participantes = [];

    for (var i = 0; i < datos.clientes.length; i++) {
      if(datos.clientes[i].user_data.tipo == 'Usuario'){
        participantes.push(datos.clientes[i]);
      }
    }

    $scope.clientes = participantes;
  });

  MySocket.on('limpie_pantalla', function(){
  	$state.go('app.main.espectador');

	});

  MySocket.on('mostrar_pregunta', function(){
    $state.go('app.main.espectador');

  });




	
});