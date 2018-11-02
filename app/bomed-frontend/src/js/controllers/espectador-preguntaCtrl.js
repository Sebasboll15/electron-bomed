angular.module('app')
.controller('espectador-preguntaCtrl', function($scope, USER, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  
  $scope.pregunta = {};
  
  console.log(localStorage.sc_pregunta);
  
  if(localStorage.sc_pregunta){
  	$scope.pregunta = JSON.parse(localStorage.sc_pregunta);
  }

  MySocket.on('limpie_pantalla', function(){
  	$state.go('app.main.espectador');

  });

  MySocket.on('llevar_espectadorU', function(){
    $state.go('app.main.espectador');

  });

 
  
	
});