angular.module('app')
.controller('espectador-preguntaCtrl', function($scope, USER, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  $scope.pregunta        = [];
  console.log('hola pescado', USER);

   MySocket.on('quite_pregunta', function(){
    $state.go('app.main.espectador');

  });

 
  
	
});