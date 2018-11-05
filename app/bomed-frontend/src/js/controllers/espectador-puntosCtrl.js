angular.module('app')
.controller('espectador-puntosCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state, USER){
  $scope.puntos = {};
  $scope.USER         = USER;

  if ($scope.USER.tipo != 'Espectador') {
      $state.go('app.main');
  }

   if(localStorage.sc_puestos){
  		$scope.puntos = JSON.parse(localStorage.sc_puestos);
  	}

  MySocket.on('limpie_pantalla', function(){
    $state.go('app.main.espectador');

  });



	
});