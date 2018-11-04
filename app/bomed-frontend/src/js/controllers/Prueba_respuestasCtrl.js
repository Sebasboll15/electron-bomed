angular.module('app')

.controller('Prueba_respuestasCtrl', function($scope, $interval, USER, $state, $http, toastr, MySocket, $uibModal){
	$scope.usuario= USER ;
	$scope.respuesta_llevada={};
	$scope.indice_preg = 0;
   
	
	$http.get('::Prueba_en_curso',  {params: { actual: 1 } }).then (function(result){
			$scope.prueba = result.data.prueba ;
			$scope.preguntas = result.data.preguntas ;
			
			$scope.reiniciar_tiempo();
			
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
	$scope.reiniciar_tiempo = function (){
		
		$scope.timeleft = $scope.prueba.tiempo_preg;
		$scope.tiempo = 0;
		$scope.downloadTimer = $interval(function(){

			$scope.tiempo = $scope.prueba.tiempo_preg - --$scope.timeleft;
			
			if($scope.timeleft <= 0){
				$scope.seleccionarOpcion('');
				$interval.cancel($scope.downloadTimer);
			}
		}, 1000);
		
	}
	
	
	MySocket.on('next_question',function(res){
		$scope.esperando_preg 	= false;
		$scope.indice_preg 		= $scope.indice_preg + 1;
		$scope.reiniciar_tiempo();
	});	

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

		$http.get('::Prueba_en_curso/insertar', {params: {preg_id: $scope.preguntas[$scope.indice_preg].rowid, usuario_id: USER.rowid, opcion_elegida: opcion, correcta: correcta, duracion: $scope.tiempo }  }).then (function(result){
		 
			
			console.log('Se insertaron los datos con exito', result);
			
			
			if ($scope.prueba.dirigido == 'Dirigido') {
				$scope.esperando_preg = true;
				$interval.cancel($scope.downloadTimer);
			}else{
				
				$scope.indice_preg = $scope.indice_preg + 1;
				$scope.reiniciar_tiempo();

			}

			if ($scope.indice_preg == $scope.preguntas.length) {
			
				toastr.success('Prueba terminada');
				$state.go('app.main');
			};
				
			
		 }, function(error){
		   console.log('No se pudo insertar los datos', error);

		 })


				


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