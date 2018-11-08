angular.module('app')

.controller('Prueba_respuestasCtrl', function($scope, $interval, USER, $state, $http, toastr, MySocket, $uibModal, $timeout){
	$scope.usuario= USER ;
	$scope.respuesta_llevada={};
	$scope.indice_preg = 0;
	$scope.esperando = false;
	$scope.free_till_question = -1;  
	$scope.pathImg    = location.protocol + '//' + location.hostname + ':8787/images/';
	
   
	$scope.USER        	= USER;

	if ($scope.USER.tipo != 'Usuario') {
    	$state.go('app.main');
  	}

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
			
			if ($scope.esperando) {
				$interval.cancel($scope.downloadTimer);
				return
			}

			$scope.tiempo = $scope.prueba.tiempo_preg - --$scope.timeleft;
			if ($scope.timeleft > 0) {
				$scope.esperando = false;	
			}

			if($scope.timeleft <= 0){
				$scope.seleccionarOpcion('');
				$interval.cancel($scope.downloadTimer);
			}
		}, 1000);
		
	}
	
	MySocket.on('set_free_till_question',function(res){
		$scope.free_till_question = res.free_till_question;
	});
	
	MySocket.on('next_question_only',function(res){
		if ($scope.esperando == false) {
			return;
		}
		if ($scope.indice_preg == $scope.preguntas.length) {
			
			toastr.success('Prueba terminada');
			$state.go('app.main');
		}else	{
			$scope.esperando_preg 	= false;
			$scope.esperando 		= false;
			$scope.indice_preg 		= $scope.indice_preg + 1;
			$scope.reiniciar_tiempo();
		};
	});

	MySocket.on('next_question',function(res){
		$scope.siguiente_preg();
	});

	MySocket.on('next_question_only',function(res){
		$scope.siguiente_preg();
	});	

	$scope.siguiente_preg = function(liberado){
		
		if ($scope.esperando == false && !liberado) {
			return;
		} else	{
			$scope.esperando_preg 	= false;
			$scope.esperando 		= false;
			$scope.indice_preg 		= $scope.indice_preg + 1;
			$scope.reiniciar_tiempo();
		};
	}


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
					 
			
			console.log('$scope.indice_preg+1', $scope.indice_preg+1, $scope.preguntas.length);
			if (($scope.indice_preg+1) == $scope.preguntas.length) {
				$interval.cancel($scope.downloadTimer);
				$scope.esperando_preg 	= true;
				$scope.esperando 		= true;
				toastr.success('Prueba terminada');
				$state.go('app.main', {}, {reload: true});
			}


			
			if ($scope.prueba.dirigido == 'Dirigido') {
				
				if ( $scope.free_till_question <= ($scope.indice_preg + 1) ) {
					$scope.esperando 	  = true;
					$scope.esperando_preg = true;
				}else{
					$scope.siguiente_preg(true);
				}
				$interval.cancel($scope.downloadTimer);
				$timeout(function(){
					$interval.cancel($scope.downloadTimer);
				}, 100)
				
			} else {
				
				$scope.indice_preg = $scope.indice_preg + 1;
				$scope.reiniciar_tiempo();

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