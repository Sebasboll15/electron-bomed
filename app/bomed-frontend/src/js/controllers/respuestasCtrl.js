angular.module('app')


.controller('respuestasCtrl', function($scope, $filter, $http, toastr, USER, $state){
   $scope.mostrando 	= false;
	$scope.boton1 		= true;
	$scope.usuarios		= {};
	$scope.resp_nueva 	= {};
	$scope.resp_edit 	= {};
	$scope.USER        	= USER;

	if ($scope.USER.tipo != 'Admin') {
    	$state.go('app.main');
  	}

	$scope.traer_dato= function(){
		
		$http.get('::respuestas').then (function(result){
			$scope.respuestas = result.data ;
			console.log('Se trajo los datos con exito', result);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
   
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
      	
      	toastr.success('Se ha borrado la respuesta con éxito')	
        $scope.traer_dato();
	    }, function(error){
	    
	    });
             	


    };
    
});