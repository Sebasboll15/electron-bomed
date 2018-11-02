angular.module('app')
.controller('pruebasCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr,  $uibModal){
    $scope.mostrando_crear= false;
    $scope.mostrando_edit = false;
	$scope.dejarver= false;
	$scope.boton3= true;
	$scope.mostrar_boton= true;
	$scope.crea 	= {
		dirigido: 'Dirigido',
		mostrar_respuesta: 'Si',
		puntos_promedio: 'Puntos',
		tiempo_preg: 30,
		actual: 1,
		tiempo_exam: 15
	};
	
	$scope.pruebas= [];
	$scope.preguntas= {};
    
    $location.hash('');
	
	
	// Editor options.
	$scope.options = {
		language: 'es',
		allowedContent: true,
		entities: false
	};

   $scope.traer_datos = function(){
   			$http.get('::pruebas').then (function(result){
				     				       
            $scope.pruebas = result.data  ;

		     console.log('Se trajo los datos con exito', result);
		    }, function(error){
		      console.log('No se pudo traer los datos', error);

		    })
   	};
   	$scope.traer_datos();


   $scope.seleccionarPrueba = function(prueba){


		  	$http.get('::pruebas/Seleccionar_Prueba',  {params: {rowid: prueba.rowid} }).then (function(result){
                
                for (var i = 0; i < $scope.pruebas.length; i++) {
					$scope.pruebas[i].actual = 0;
				}
				
				prueba.actual = 1;
                    
				$scope.traer_datos();

				
				
                console.log('Se actualizaron los datos con exito', result);
               
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })

	};

	$scope.mostrar_crear= function(){
		
		$scope.mostrar_boton= false;
		$scope.mostrando_crear= true;
		$scope.mostrando_edit= false;

		$location.hash('crear-prueba-div');
    	$anchorScroll();
	
	
	};
	
	$scope.salir_crear= function(){
		$scope.mostrando_crear= false;
		$scope.mostrar_boton= true;
	};
	 		
	$scope.verDetallesPrueba= function(id){
		$scope.mostrar_boton= false;
		$scope.dejarver= true;
		$scope.boton3= false;
			    

		$http.get('::pruebas/Detalles').then (function(result){
		console.log('Hola', result);
	    $scope.usuarios = result.data.usuarios ;
		$scope.preguntas = result.data.preguntas; 
				
				
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
				

	};
	
	$scope.ocultar= function(){
		
		$scope.dejarver= false;
	};
	
  	$scope.insertarPrueba = function(crea){


  		if (crea.nombre == '' || crea.nombre == undefined) {
  			toastr.error('Debe escribir el nombre');
  			return;
  		}

  		if (crea.dirigido == '' || crea.dirigido == undefined) {
  			toastr.error('Debe escoger el sexo');
  			return;
  		}

  		if (crea.mostrar_respuesta == '' || crea.mostrar_respuesta == undefined) {
  			toastr.error('Debe escribir el mostrar_respuesta');
  			return;
  		}

  		if (crea.puntos_promedio == '' || crea.puntos_promedio == undefined) {
  			toastr.error('Debe escribir la contraseña');
  			return;
  		}

  		if (crea.dirigido == 'Dirigido') {
  			if (crea.tiempo_preg == '' || crea.tiempo_preg == undefined) {
  				toastr.error('Debe determinar el tiempo por pregunta');
  				return;
  			}	
  		}

  		if (crea.dirigido == 'Manual') {
  			if (crea.tiempo_exam== '' || crea.tiempo_exam == undefined) {
  				toastr.error('Debe determinar el tiempo del examen');
  				return;
  			}	
  		}
	    datos = {
	    	nombre: crea.nombre, 
		    alias: crea.alias, 
		    dirigido: crea.dirigido, 
		    actual: crea.actual, 
		    mostrar_respuesta: crea.mostrar_respuesta, 
		    puntos_promedio: crea.puntos_promedio, 
		    tiempo_preg: crea.tiempo_preg, 
		    tiempo_exam: crea.tiempo_exam
		}

		console.log('hola', crea);


  		$http.get('::pruebas/insertar', {params: datos}).then(function(result){
	    	toastr.success('Se ha insertado la prueba con éxito')
			
	    	$scope.traer_datos();

			$scope.crea 	= {
				dirigido_t: 'Dirigido',
				mostrar_respuesta: 'Si',
				puntos_promedio: 'Puntos',
				tiempo_preg: 30,
				actual: 1,
				tiempo_exam: 15
			};
	        
	      if ($scope.mostrando_crear == false) {
			 	$scope.mostrar_boton  = true;
			 }

	    }, function(error){
	       console.log('No se pudo insertar los datos', error);

	    })

	};
  	
  	$scope.salir_editar = function(){
		$location.hash('');
		$scope.mostrando_edit= false;
		$scope.mostrar_boton= true;
	};

    $scope.editarP = function(cambia){
      $scope.mostrar_boton= false;
      $scope.mostrando_crear = false;
      $scope.mostrando_edit	 = true;
      $scope.prueba          = cambia;

      $location.hash('editar-prueba-div');
    	$anchorScroll();
	
		
      for (var i = 0; i < $scope.pruebas.length; i++) {
			$scope.pruebas[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    
    $scope.editarPrueba = function(cambia){

    	if (cambia.nombre == '' || cambia.nombre == undefined) {
  			toastr.error('Debe escribir el nombre');
  			return;
  		}

  		if (cambia.alias == '' || cambia.dirigido == undefined) {
  			toastr.error('Debe escoger el sexo');
  			return;
  		}

  		if (cambia.dirigido == '' || cambia.dirigido == undefined) {
  			toastr.error('Debe escoger el sexo');
  			return;
  		}

  		if (cambia.mostrar_respuesta == '' || cambia.mostrar_respuesta == undefined) {
  			toastr.error('Debe escribir el mostrar_respuesta');
  			return;
  		}

  		if (cambia.puntos_promedio == '' || cambia.puntos_promedio == undefined) {
  			toastr.error('Debe escribir la contraseña');
  			return;
  		}

  		if (cambia.dirigido == 'Dirigido') {
  			if (cambia.tiempo_preg == '' || cambia.tiempo_preg == undefined) {
  				toastr.error('Debe determinar el tiempo por pregunta');
  				return;
  			}	
  		}

  		if (cambia.dirigido == 'Manual') {
  			if (cambia.tiempo_exam== '' || cambia.tiempo_exam == undefined) {
  				toastr.error('Debe determinar el tiempo del examen');
  				return;
  			}	
  		}
	  	$http.get('::pruebas/editar',  {params: { nombre: cambia.nombre, alias: cambia.alias, dirigido: cambia.dirigido, mostrar_respuesta: cambia.mostrar_respuesta, puntos_promedio: cambia.puntos_promedio, tiempo_preg: cambia.tiempo_preg, tiempo_exam: cambia.tiempo_exam, rowid: cambia.rowid} }).then (function(result){

			toastr.success('Se ha editado la prueba con éxito')

			$scope.traer_datos();

         }, function(error){
           console.log('No se pudo actualizar los datos', error);

         })
	  	$scope.mostrar_boton= true;

	};
    


    $scope.eliminar_test = function(prueba){
	          
	    $http.delete('::pruebas/eliminar', {params: { id: prueba.rowid } }).then(function(result){
			console.log('Se borraron los datos con exito', result);
         
			toastr.success('Se ha eliminado la prueba con éxito')
	           	
	        $scope.traer_datos();

		}, function(error){
			console.log('No se pudo borrarlos datos', error);

		})

    };
	
	$scope.abrirModal_eliminar = function (eliminar) {

	    	var modalInstance = $uibModal.open({
				templateUrl: 'views/Modal_eliminar.html',
				controller: 'Modal_eliminarUCtrl',
				animation: false,
				resolve: {
				    eliminar: function () {
				    	return eliminar;
				    }
				},
	      	});

	      	console.log(modalInstance);
	            
	  		modalInstance.result.then(function (eliminar) {
		     console.log(eliminar);
		     $scope.eliminar_test(eliminar);
		    })
	    };  
	
})

.controller('Modal_eliminarUCtrl', function($scope, $uibModalInstance, eliminar, AuthServ, toastr){

    $scope.eliminar = eliminar;
  
    $scope.ok = function(){
        
      $uibModalInstance.close($scope.eliminar);  
    };

    $scope.cancel = function () {
        
      $uibModalInstance.dismiss('cancel');
    }; 
   
});