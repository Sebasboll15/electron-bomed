angular.module('app')

.controller('Prueba_respuestasCtrl', function($scope, AuthServ, USER, $state, $http, toastr, MySocket, $uibModal){
	$scope.usuario= USER ;
	$scope.respuesta_llevada={};
	$scope.indice_preg = 0;
   
	
	$http.get('::Prueba_en_curso',  {params: { actual: 1} }).then (function(result){
			$scope.prueba = result.data.prueba ;
			$scope.preguntas = result.data.preguntas ;
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
					

	$scope.seleccionarOpcion = function(opcion) {

		
		correcta = 0;
		if ($scope.preguntas[$scope.indice_preg].correcta == opcion ) {
			correcta = 1;
		} 

		if ($scope.prueba.mostrar_respuesta == 'Si') {
			if (correcta == 0) {
				toastr.info('Respuesta incorrecta');
			}else {
				toastr.info('Respuesta correcta');
			}
		} 


		MySocket.emit('contesto_mal/bien', {correcta: correcta});     

		$http.get('::Prueba_en_curso/insertar', {params: {preg_id: $scope.preguntas[$scope.indice_preg].rowid, usuario_id: USER.rowid, opcion_elegida: opcion, correcta: correcta, duracion: 0 }  }).then (function(result){
		 
		
			console.log('Se insertaron los datos con exito', result);
			
		 }, function(error){
		   console.log('No se pudo insertar los datos', error);

		 })


			if ($scope.prueba.dirigido == 1) {

			}else{

				$scope.indice_preg = $scope.indice_preg + 1;

			}

			if ($scope.indice_preg == $scope.preguntas.length) {
			
			 toastr.success('Prueba terminada');
			 $state.go('app.main');
			};
			
				


	};    

	$scope.OpenModalP_respuestas = function (opcion) {

	    var modalInstance = $uibModal.open({
	      templateUrl: 'views/ModalPrueba_respuestas.html',
	      controller: 'ModalPrueba_respuestasCtrl',
	      animation: false,
	      resolve: {
	          opcion: function () {
	            return opcion;
	          }
	      },
	    });
	        
	    modalInstance.result.then(function (opcion) {
	      
	     $scope.seleccionarOpcion(opcion);
	    
	    });
	  
  	};	

})

.controller('ModalPrueba_respuestasCtrl', function($scope, $uibModalInstance, opcion, AuthServ, toastr){

    $scope.opcion = opcion;
  
    $scope.ok = function(){
        
      $uibModalInstance.close($scope.opcion);  

    };

    $scope.cancel = function () {
        
      $uibModalInstance.dismiss('cancel');
    }; 
   
});