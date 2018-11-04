angular.module('app')

.controller('DashboardCtrl', function($scope, AuthServ, $state, MySocket, $http, USER, toastr, $uibModal){
	
	$scope.USER 		= USER;
	$scope.$state 		= $state;
	$scope.depend_usuario= false;
	MySocket.emit('traer_participantes');
	
	$scope.traer_datos = function(){
		$http.get('::Dashboard').then (function(result){
			$scope.prueba = result.data[0];
			console.log('hola', $scope.USER.prueba_id);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
	};


	$scope.traer_datos();
	
	
	MySocket.on('limpie_pantalla', function(){
		$state.go('app.main.espectador');
  
	});
  
	
	MySocket.on('empezar_examen', function(){
		$scope.Ir_prueba(true);
  
	});
  

	$scope.colocar_botones = function(){
		if ($scope.USER.tipo == 'Espectador') {
			$scope.depend_usuario = true;
		}else	{
			$scope.depend_usuario= false;
		}	

	};
	$scope.colocar_botones();



	AuthServ.verificar_user_logueado().then( function(r){

		$scope.USER = r;
	
	    setTimeout(function(){


			if (!localStorage.getItem('registered_boolean')){
				localStorage.registered_boolean = false
			}

			if (localStorage.getItem('registered_boolean')) {
				registered = localStorage.getItem('registered_boolean')
			}else{
				registered = false
			}

			if (registered=='false') {
				registered = false;
			}

			$scope.USER.registered 		= registered;
			$scope.USER.logged 			= true;

	       MySocket.emit('toma_mis_datos', {usuario: $scope.USER})

	    }, 1000);
	   
		
	});
	
     
    

    $scope.traer_puestos = function(){

    	MySocket.emit('necesito_puestos');	

    }

    MySocket.on('toma_los_puestos', function(datos){
    	console.log(datos);
    })
	



		//$scope.anadir= function(id){
			//  console.log('hol', id); 
			//   consulta = "update  usuarios set  prueba_id= ?  where rowid= ?";
		// datos= [id, 2];
		//  ConexionServ.query(consulta, datos).then (function(result){
				
			//   console.log('Se actualizaron los datos con exito', result);
			
		// }, function(error){
			//  console.log('No se pudo actualizar los datos', error);

		//  })
		  






			//};
             
	$scope.cerrar_sesion= function(){
		AuthServ.cerrar_sesion();
	};


	 MySocket.on('sesion_A_cerrar', function (){
               
        toastr.info('Cerrando sesión...');
		AuthServ.cerrar_sesion();
		
    })
	
	$scope.Ir_espectador= function(){
		$state.go('app.main.espectador');
	};

	$scope.Ir_prueba = function(permiso){
		
		if ($scope.prueba.dirigido == 'Dirigido' && !permiso) {
			toastr.warning('El administrador iniciará la prueba en breve.');
			return;
		}
		
		if ($scope.prueba.rowid == $scope.USER.prueba_id) {
			$state.go('app.prueba_respuestas');
		} else {
			toastr.error('Su prueba no esta disponible');
			return;
		};

	};

	$scope.OpenModalCerrar_sesion = function (opcion) {

	    var modalInstance = $uibModal.open({
	      templateUrl: 'views/ModalCerrar_sesion.html',
	      controller: 'ModalCerrar_sesionCtrl',
	      animation: false,
	      resolve: {
	          opcion: function () {
	            return opcion;
	          }
	      },
	    });
	        
	    modalInstance.result.then(function (opcion) {
	      
	     $scope.cerrar_sesion();
	    
	    });
	  
  	};	

})


.controller('ModalCerrar_sesionCtrl', function($scope, $uibModalInstance, opcion, AuthServ, toastr){

    $scope.opcion = opcion;
  
    $scope.ok = function(){
        
      $uibModalInstance.close($scope.opcion);  
    };

    $scope.cancel = function () {
        
      $uibModalInstance.dismiss('cancel');
    }; 
   
});



