angular.module('app')
.controller('espectador-preguntaCtrl', function($scope, USER, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  
  $scope.pregunta        = JSON.parse(localStorage.sc_pregunta);

  MySocket.on('limpie_pantalla', function(){
  	$state.go('app.main.espectador');

  });

  MySocket.on('llevar_espectadorU', function(){
    $state.go('app.main.espectador');

  });

 
  
	
});