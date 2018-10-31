angular.module('app')
.controller('espectador-puntosCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  $scope.puntos = {};
  
  MySocket.on('sc_toma_los_puestos', function(data){
    $scope.puntos = data.examenes;
    console.log('eee', data);
  });

  MySocket.on('limpie_pantalla', function(){
    $state.go('app.main.espectador');

  });



	
});