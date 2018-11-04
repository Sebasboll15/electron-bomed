angular.module('app')
.controller('espectador-puestoCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  $scope.puesto = {};
  $scope.posicion = {};
  
  
  if(localStorage.sc_puesto){
  	$scope.puesto = JSON.parse(localStorage.sc_puesto);
  }

  MySocket.on('limpie_pantalla', function(){
    $state.go('app.main.espectador');

  });





	
});