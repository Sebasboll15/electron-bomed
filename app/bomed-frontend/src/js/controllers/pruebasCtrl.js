angular.module('app')
.controller('pruebasCtrl', function($scope, $filter, $http, $location, $anchorScroll,toastr){
    $scope.mostrando_crear= false;
    $scope.mostrando_edit = false;
	$scope.dejarver= false;
	$scope.boton3= true;
	$scope.boton1= true;
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
		
		$scope.mostrando_crear= true;
		$scope.boton1= false;
		$scope.mostrando_edit= false;

		$location.hash('crear-prueba-div');
    	$anchorScroll();
	
	
	};
	
	$scope.salir_crear= function(){
		$scope.mostrando_crear= false;
	};
	 		
	$scope.verDetallesPrueba= function(id){
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
	        
	        $scope.mostrando = false;
	        
	    }, function(error){
	       console.log('No se pudo insertar los datos', error);

	    })

	};
  	
  	$scope.salir_editar = function(){
		$location.hash('');
		$scope.mostrando_edit= false;
	};

    $scope.editarP = function(cambia){
      
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

	  	$http.get('::pruebas/editar',  {params: { nombre: cambia.nombre, alias: cambia.alias, dirigido: cambia.dirigido, mostrar_respuesta: cambia.mostrar_respuesta, puntos_promedio: cambia.puntos_promedio, tiempo_preg: cambia.tiempo_preg, tiempo_exam: cambia.tiempo_exam, rowid: cambia.rowid} }).then (function(result){

			toastr.success('Se ha editado la prueba con éxito')

			$scope.traer_datos();

         }, function(error){
           console.log('No se pudo actualizar los datos', error);

         })

	};
    


    $scope.eliminar_test = function(prueba){

    	res = confirm('¡Seguro que deseas eliminar la prueba: '+ prueba.alias +'?');
    	if (!res) {
    		return;
    	}
	          
	    $http.delete('::pruebas/eliminar', {params: { id: prueba.rowid } }).then(function(result){
			console.log('Se borraron los datos con exito', result);
         
			toastr.success('Se ha eliminado la prueba con éxito')
	           	
	        $scope.traer_datos();

		}, function(error){
			console.log('No se pudo borrarlos datos', error);

		})

    };

    
	
   
	
});