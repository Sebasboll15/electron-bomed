angular.module('app')


.controller('preguntasCtrl', function($scope, ConexionServ, $filter, $http){
   $scope.mostrando = false;
	$scope.boton1 	= true;
	$scope.usuarios	= {};
	$scope.preg_nueva 	= {};
	$scope.preg_edit 	= {};
	 $scope.preguntas = {};
	
        $scope.traer_datos= function(){


			$http.get('::preguntas').then (function(result){
				
				$scope.preguntas = result.data ;
				console.log(result);
				console.log('Se trajo los datos con exito', result);
			}, function(error){
				console.log('No se pudo traer los datos', error);

			})
			
        };
         $scope.traer_datos();

			$scope.mostrar= function(){
				$scope.mostrando= true;
				$scope.boton1= false;
			
			};
			 $scope.salir = function(){
              $scope.mostrando= false
             };
	
	
  	$scope.insertarAsk = function(crea){
        
        $scope.mostrando = false;
  		if (crea.definicion == '' || crea.definicion == undefined) {
  			alert('Debe escribir la definición');
  			return;
  		}
       
  		$http.get('::preguntas/insertar', {params: {definicion: crea.definicion, tipo: crea.tipo, prueba_id: crea.prueba_id, opc_a: crea.opc_a, opc_b: crea.opc_b, opc_c: crea.opc_c, opc_d: crea.opc_d, correcta: crea.correcta  }  }).then (function(result){
	     
	       $scope.traer_datos();
	        console.log('Se insertaron los datos con exito', result);
	        
	    }, function(error){
	       console.log('No se pudo insertar los datos', error);

	    })

	         
	};
  
    $scope.editarP = function(cambia){
      for (var i = 0; i < $scope.preguntas.length; i++) {
			$scope.preguntas[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    $scope.editarAsk = function(cambia){
	           console.log(cambia);
	           $http.get('::preguntas/editar',  {params: {definicion: cambia.definicion, tipo: cambia.tipo, prueba_id: cambia.prueba_id, opc_a: cambia.opc_a, opc_b: cambia.opc_b, opc_c: cambia.opc_c, opc_d: cambia.opc_d, correcta: cambia.correcta, rowid: cambia.rowid }}).then (function(result){
                console.log('Se actualizaron los datos con exito', result);
                 $scope.traer_datos();
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
	
		  


     

   };
    $scope.eliminar_ask = function(rowid){
	    
	    $http.delete('::preguntas/eliminar', {params: { id: rowid } }).then (function(result){
			console.log('Se borraron los datos con exito', result);
            $scope.traer_datos();
		}, function(error){
			console.log('No se pudo borrarlos datos', error);

		})

             


    }

  

});

