angular.module('app')
.controller('espectador-puntosCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  $scope.puntos = {};
  
   if(localStorage.sc_puestos){
  		$scope.puntos = JSON.parse(localStorage.sc_puestos);
  	}

  MySocket.on('limpie_pantalla', function(){
    $state.go('app.main.espectador');

  });



	
});