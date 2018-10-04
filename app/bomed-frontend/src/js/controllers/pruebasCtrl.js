angular.module('app')
.controller('pruebasCtrl', function($scope, $filter, $http){
    $scope.mostrando= false;
	$scope.dejarver= false;
	$scope.boton3= true;
	$scope.boton1= true;
	
	$scope.pruebas= [];
	$scope.preguntas= {};
    

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


    
		

       



	$scope.mostrar= function(){
		
		$scope.mostrando= true;
		$scope.bsoton1= false;
	
	};
	
	$scope.salir= function(){
		$scope.mostrando= false;
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
	         
  			$http.get('::pruebas/insertar', {params: {nombre: crea.nombre, alias: crea.alias, dirigido: crea.dirigido, mostrar_respuesta: crea.mostrar_respuesta, puntos_promedio: crea.puntos_promedio, tiempo_preg: crea.tiempo_preg, tiempo_exam: crea.tiempo_exam}}).then (function(result){
	     
	     $scope.traer_datos();



	        console.log('Se insertaron los datos con exito', result);
	        
	    }, function(error){
	       console.log('No se pudo insertar los datos', error);

	    })

	};
  
    $scope.editarP = function(cambia){
      for (var i = 0; i < $scope.pruebas.length; i++) {
			$scope.pruebas[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    
    $scope.editarPrueba = function(cambia){
	         
		  
		  	$http.get('::pruebas/editar',  {params: { nombre: cambia.nombre, alias: cambia.alias, dirigido: cambia.dirigido, mostrar_respuesta: cambia.mostrar_respuesta, puntos_promedio: cambia.puntos_promedio, tiempo_preg: cambia.tiempo_preg, tiempo_exam: cambia.tiempo_exam, rowid: cambia.rowid} }).then (function(result){
                console.log('Se actualizaron los datos con exito', result);
              $scope.traer_datos();



	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })


     

   };
    
    $scope.eliminar_test = function(rowid){
	          
	    $http.delete('::pruebas/eliminar', {params: { id: rowid } }).then (function(result){
			console.log('Se borraron los datos con exito', result);
         $scope.traer_datos();
 


		}, function(error){
			console.log('No se pudo borrarlos datos', error);

		})

    };

    
	
   
	
});