angular.module('app')
.controller('espectadorCtrl', function($scope, $anchorScroll,toastr, MySocket, $state){
  
  $scope.traer_dato = function(){
  
    MySocket.emit('Ya_estoy_aqui');

  }

  $scope.traer_dato();

	
	MySocket.on('llevelos_espectadoresU', function(data){
    	$scope.traer_dato();
      $state.go('app.main.espectador.participantes');
  	});

  	MySocket.on('sc_mostrar_pregunta', function(data){
		localStorage.sc_pregunta = JSON.stringify(data.pregunta);
    	$state.go('app.main.espectador.pregunta', {}, {reload: true});
  	});

    MySocket.on('sc_mostrar_puestos', function(data){
      MySocket.emit('Estoy_en_punto', {examenes: data.examenes});
      $state.go('app.main.espectador.puntos');
    });

    MySocket.on('sc_mostrar_puesto', function(data){
      MySocket.emit('Estoy_en_puesto', {examen: data.examen, posicion: data.posicion});
      $state.go('app.main.espectador.puesto');
    });


	


	
});