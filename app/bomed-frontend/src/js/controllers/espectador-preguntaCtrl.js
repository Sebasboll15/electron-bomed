angular.module('app')
.controller('espectador-preguntaCtrl', function($scope, USER, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  
  $scope.pregunta = {};
  
  if(localStorage.sc_pregunta){
  	$scope.pregunta = JSON.parse(localStorage.sc_pregunta);
  }


 
  
	
});