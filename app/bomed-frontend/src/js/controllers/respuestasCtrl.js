angular.module('app')


.controller('respuestasCtrl', function($scope, ConexionServ, $filter, $http){
   $scope.mostrando = false;
	$scope.boton1 	= true;
	$scope.usuarios	= {};
	$scope.resp_nueva 	= {};
	$scope.resp_edit 	= {};

	$scope.traer_dato= function(){
		
		$http.get('::respuestas').then (function(result){
			$scope.respuestas = result.data ;
			console.log('Se trajo los datos con exito', result);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})

		

		//consulta = "Select r.*, r.rowid from respuestas r INNER JOIN preguntas p ON r.preg_id= p.rowid";
		//ConexionServ.query(consulta, []).then (function(result){
		//	$scope.respuestas= result ;
		//	console.log(result);
		//	console.log('Se trajo los datos con exito', result);
		//}, function(error){
		//	console.log('No se pudo traer los datos', error);

		//})
   
    };
    
    $scope.traer_dato();



	$scope.mostrar= function(){
		
		$scope.mostrando= true;
		$scope.bsoton1= false;
			
	};
			
	$scope.salir= function(){
		
		$scope.mostrando= false;
	};
	
		  

    $scope.eliminar_ans = function(rowid){
	    $http.delete('::respuestas/eliminar', {params: { id: rowid } }).then(function(result){
      		
        $scope.traer_dato();
	    }, function(error){
	    
	    });
             	


    };
    
});