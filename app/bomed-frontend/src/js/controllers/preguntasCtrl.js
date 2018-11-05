angular.module('app')


.controller('preguntasCtrl', function($scope, $filter, $http, $location, $anchorScroll, toastr, USER, $state, $uibModal){
	console.log('dfvsd');
    $scope.mostrando 	= false;
    $scope.mostrando_edit = false;
	$scope.mostrar_boton= true;
	$scope.usuarios		= {};
	$scope.preg_edit 	= {};
	$scope.preguntas 	= {};
	$scope.pruebas 		= {};
	$scope.preg_nueva 	= { 
		definicion: '',
		tipo: 		'Multiple',
	};
	$scope.USER        	= USER;

	if ($scope.USER.tipo != 'Admin') {
    	$state.go('app.main');
  	}
	$location.hash('');


	
	
	// Editor options.
	$scope.options = {
		language: 'es',
		allowedContent: true,
		entities: false
	};

        

	$scope.traer_datos= function(){


		$http.get('::preguntas').then (function(result1){
			
			$scope.preguntas = result1.data ;

			console.log('Se trajo los datos con exito', result1);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
		
		$http.get('::pruebas').then (function(result2){

			$scope.pruebas 					= result2.data ;
			$scope.preg_nueva.prueba_id 	= $scope.pruebas[0].rowid;

		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
	}

	$scope.traer_datos();

	$scope.mostrar_crear = function(){

		$scope.mostrando= true;
		$scope.mostrar_boton= false;
		$scope.mostrando_edit= false;

		$location.hash('crear-pregunta-div');
    	$anchorScroll();
	
	};

	
	
	$scope.salir_crear = function(){
		$location.hash('');
		$scope.mostrando= false;
		$scope.mostrar_boton= true;
	};

	$scope.salir_editar = function(){
		$location.hash('');
		$scope.mostrar_boton= true;
		$scope.mostrando_edit= false;
	};
	
	
  	$scope.insertarAsk = function(crea){
      console.log('ggggggg', crea);
  		
  		if (crea.definicion == '' || crea.definicion == undefined) {
  			toastr.error('Debe escribir la definición');
  			return;
  		}

  		if (crea.prueba_id == '' || crea.prueba_id == undefined) {
  			toastr.error('Debe indicar la prueba a la que pertenece');
  			return;
  		}

  		if (crea.tipo == '' || crea.tipo == undefined) {
  			toastr.error('Debe indicar el tipo de pregunta');
  			return;
  		}

  		if (crea.tipo == 'Múltiple') {
  			if (crea.opc_a == '' || crea.opc_a == undefined) {
  				toastr.error('Debe escribir la opcion A');
  				return;
  			}

  		}

  		if (crea.tipo == 'Múltiple') {
  			if (crea.opc_b == '' || crea.opc_b == undefined) {
  				toastr.error('Debe escribir la opcion B');
  				return;
  			}

  		}

  		if (crea.tipo == 'Múltiple') {
  			if (crea.opc_c == '' || crea.opc_c == undefined) {
  				toastr.error('Debe escribir la opcion C');
  				return;
  			}

  		}

  		if (crea.tipo == 'Múltiple') {
  			if (crea.opc_d == '' || crea.opc_d == undefined) {
  				toastr.error('Debe escribir la opcion D');
  				return;
  			}

  		}

  		if (crea.tipo == 'Falso-Verdadero') {
  			if (crea.correctaFV == '' || crea.correctaFV == undefined) {
  				toastr.error('Debe indicar si la respuesta es falsa o verdadera');
  				return;
  			}else	{
  				$scope.correcta_crear = crea.correctaFV ;	
  			}
  			
  			if (crea.opc_a == undefined) {
				crea.opc_a = '';
			}
			if (crea.opc_b == undefined) {
				crea.opc_b = '';
			}
			if (crea.opc_c == undefined) {
				crea.opc_c = '';
			}
			if (crea.opc_d == undefined) {
				crea.opc_d = '';
			}
  		
  		}

  		if (crea.tipo == 'Múltiple') {
  			if (crea.correctaM == '' || crea.correctaM == undefined) {
  				toastr.error('Debe indicar alguna respuesta');
  				return;
  			}else	{
  				$scope.correcta_crear = crea.correctaM ;	
  			}
  		}

  		
       
  		$http.get('::preguntas/insertar', {params: {definicion: crea.definicion, tipo: crea.tipo, prueba_id: crea.prueba_id, opc_a: crea.opc_a, opc_b: crea.opc_b, opc_c: crea.opc_c, opc_d: crea.opc_d, correcta: $scope.correcta_crear  }  }).then (function(result){
	       toastr.success('Se ha insertado la pregunta con éxito')
           
	       $scope.traer_datos();
	        console.log('Se insertaron los datos con exito', result);
	        
	    }, function(error){
	       console.log('No se pudo insertar los datos', error);

	    })
	    $scope.mostrando = false;
	    $scope.mostrar_boton= true;
	         
	};
  
    $scope.editarP = function(cambia){
        
        $scope.mostrar_boton= false;
        $scope.mostrando = false;
        $scope.mostrando_edit= true;
		$scope.pregunta = cambia;
		$location.hash('editar-pregunta-div');
    	$anchorScroll();
	

      for (var i = 0; i < $scope.preguntas.length; i++) {
			$scope.preguntas[i].editando = false;
		}
		cambia.editando = true; 

		if ($scope.pregunta.tipo == 'Múltiple' ) {
			$scope.pregunta.correctaM  = $scope.pregunta.correcta;
		}else	{
			$scope.pregunta.correctaFV = $scope.pregunta.correcta;
		}
	


    
    };
    $scope.editarAsk = function(cambia){

    	console.log('hola', cambia.correctaM);
        if (cambia.definicion == '' || cambia.definicion == undefined) {
  			toastr.error('Debe escribir la definición');
  			return;
  		}

  		if (cambia.prueba_id == '' || cambia.prueba_id == undefined) {
  			toastr.error('Debe indicar la prueba a la que pertenece');
  			return;
  		}

  		if (cambia.tipo == '' || cambia.tipo == undefined) {
  			toastr.error('Debe indicar el tipo de pregunta');
  			return;
  		}

  		if (cambia.tipo == 'Múambiaple') {
  			if (cambia.opc_a == '' || cambia.opc_a == undefined) {
  				toastr.error('Debe escribir la opcion A');
  				return;
  			}

  		}

  		if (cambia.tipo == 'Múltiple') {
  			if (cambia.opc_b == '' || cambia.opc_b == undefined) {
  				toastr.error('Debe escribir la opcion B');
  				return;
  			}

  		}

  		if (cambia.tipo == 'Múltiple') {
  			if (cambia.opc_c == '' || cambia.opc_c == undefined) {
  				toastr.error('Debe escribir la opcion C');
  				return;
  			}

  		}

  		if (cambia.tipo == 'Múltiple') {
  			if (cambia.opc_d == '' || cambia.opc_d == undefined) {
  				toastr.error('Debe escribir la opcion D');
  				return;
  			}

  		}

  		if (cambia.tipo == 'Falso-Verdadero') {
  			if (cambia.correctaFV == '' || cambia.correctaFV == undefined) {
  				toastr.error('Debe indicar si la respuesta es falsa o verdadera');
  				return;
  			}else	{
  				$scope.correcta_editar = cambia.correctaFV ;
  			}
  			
  			if (cambia.opc_a == undefined) {
				cambia.opc_a = '';
			}
			if (cambia.opc_b == undefined) {
				cambia.opc_b = '';
			}
			if (cambia.opc_c == undefined) {
				cambia.opc_c = '';
			}
			if (cambia.opc_d == undefined) {
				cambia.opc_d = '';
			}
  		
  		}

  		if (cambia.tipo == 'Múltiple') {
  			if (cambia.correctaM == '' || cambia.correctaM == undefined) {
  				toastr.error('Debe indicar alguna respuesta');
  				return;
  			}else	{
  				$scope.correcta_editar = cambia.correctaM ;	
  			}
  		}
  
		$http.get('::preguntas/editar',  {params: {definicion: cambia.definicion, tipo: cambia.tipo, prueba_id: cambia.prueba_id, opc_a: cambia.opc_a, opc_b: cambia.opc_b, opc_c: cambia.opc_c, opc_d: cambia.opc_d, correcta: $scope.correcta_editar, rowid: cambia.rowid }}).then (function(result){
	
			toastr.success('Se ha editado la pregunta con éxito')
			$scope.traer_datos();
			$scope.pregunta 		= {}
			$scope.mostrando_edit	= false;
			$scope.mostrar_boton= true;
		}, function(error){
			console.log('No se pudo actualizar los datos', error);
		})

	};
   
   
    $scope.eliminar_ask = function(rowid){
	    
	    $http.delete('::preguntas/eliminar', {params: { id: rowid } }).then (function(result){
			toastr.success('Se ha borrado la pregunta con éxito')
            $scope.traer_datos();
		}, function(error){
			console.log('No se pudo borrarlos datos', error);

		})

             


    };

    $scope.abrirModal_eliminarPre = function (eliminar) {

	    	var modalInstance = $uibModal.open({
				templateUrl: 'views/Modal_eliminar.html',
				controller: 'Modal_eliminarPCtrl',
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
		     $scope.eliminar_ask(eliminar);
		    })
	    };

  

})

.controller('Modal_eliminarPCtrl', function($scope, $uibModalInstance, eliminar, AuthServ, toastr){

    $scope.eliminar = eliminar;
  
    $scope.ok = function(){
        
      $uibModalInstance.close($scope.eliminar);  
    };

    $scope.cancel = function () {
        
      $uibModalInstance.dismiss('cancel');
    }; 
   
});

