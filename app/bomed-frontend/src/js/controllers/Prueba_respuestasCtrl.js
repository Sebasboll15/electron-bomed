angular.module('app')

.controller('Prueba_respuestasCtrl', function($scope, AuthServ, USER, $state, $http, toastr, MySocket){
	$scope.usuario= USER ;
    $scope.respuesta_llevada={};
    $scope.indice_preg = 0;
   
    
    $http.get('::Prueba_en_curso',  {params: { rowid: USER.prueba_id} }).then (function(result){
            console.log(result);
            $scope.prueba = result.data.prueba ;
            $scope.preguntas = result.data.preguntas ;
            console.log('Se trajo los datos con exito', result);
        }, function(error){
            console.log('No se pudo traer los datos', error);

        })
                	

    $scope.seleccionarOpcion = function(opcion) {

    	correcta = 0;
    	if ($scope.preguntas[$scope.indice_preg].correcta == opcion ) {
    		correcta = 1;
    	} 
        MySocket.emit('contesto_mal/bien', correcta);     

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

});