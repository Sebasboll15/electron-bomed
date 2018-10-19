angular.module('app')
.controller('espectador-participantesCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr, MySocket){
	$scope.clientes = [];	
	
	MySocket.on('tome_participantes', function(res){
    	$scope.clientes = res;
  	});


	
});