angular.module('app')
.controller('espectador-preguntaCtrl', function($scope, USER, $filter, $http, $location, $anchorScroll,toastr, MySocket, $state){
  $scope.pregunta = {};
  
  if(localStorage.sc_pregunta){
  	$scope.pregunta = JSON.parse(localStorage.sc_pregunta);
  }

  console.log($scope.pregunta);

  $scope.seleccionarOpcion = function(opcion){
    $scope.opcion = opcion;
    
    if ($scope.opcion == 'A') {
      if ($scope.opcion == $scope.pregunta.correcta) {
        $scope.opcion_a = 1;
        toastr.success('Respuesta correcta');
      }else {
        $scope.opcion_a = 0;
        
      }  
    };

    if ($scope.opcion == 'B') {
      if ($scope.opcion == $scope.pregunta.correcta) {
        $scope.opcion_b = 1;
        toastr.success('Respuesta correcta');
      }else {
        $scope.opcion_b = 0;
       
      }  
    };

    if ($scope.opcion == 'C') {
      if ($scope.opcion == $scope.pregunta.correcta) {
        $scope.opcion_c = 1;
        toastr.success('Respuesta correcta');
      }else {
        $scope.opcion_c = 0;
       
      }  
    };

    if ($scope.opcion == 'D') {
      if ($scope.opcion == $scope.pregunta.correcta) {
        $scope.opcion_d = 1;
        toastr.success('Respuesta correcta');
      }else {
        $scope.opcion_d = 0;
      
      }  
    };
    
    if ($scope.pregunta.correcta == 'A') {
      $scope.opcion_a = 1;      
    }else  {
        if ($scope.pregunta.correcta == 'B') {
          $scope.opcion_b = 1;
        }else {
          if ($scope.pregunta.correcta == 'C') {
            $scope.opcion_c = 1;
          }else {
            if ($scope.pregunta.correcta == 'D') {
              $scope.opcion_d = 1;
            };
          };
        };
      
    };
 
  };

  MySocket.on('limpie_pantalla', function(){
    $state.go('app.main.espectador');

  });


 
  
	
});