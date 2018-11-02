angular.module('app')
.controller('espectador-puestoCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  $scope.puesto = {};
  $scope.posicion = {};
  
  MySocket.on('sc_toma_el_puesto', function(data){
    $scope.examen = data.examen;
    $scope.posicion = data.posicion;
    console.log('eee', data);
  });

  MySocket.on('limpie_pantalla', function(){
    $state.go('app.main.espectador');

  });



	
});