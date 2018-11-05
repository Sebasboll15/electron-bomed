angular.module('app')


.controller('usuariosCtrl', function($scope, $http, $filter, $uibModal, toastr, $location, $anchorScroll){
	$scope.mostrando_crear 	= false;
	$scope.mostrar_boton   	= true;
	$scope.mostrando_editar	= false;
	$scope.usuarios        	= {};
    $scope.color_seleccion1 = false;
    $scope.color_seleccion2 = false;
    $location.hash('');
	
	$scope.caja_genero1 = function(opcion){
		$scope.color_seleccion1 = true;
		$scope.color_seleccion2 = false;
		$scope.opcion = opcion;
	}

	$scope.caja_genero2 = function(opcion){
		$scope.color_seleccion1 = false;
		$scope.color_seleccion2 = true;
		$scope.opcion = opcion;
	}

	

    $scope.traer_datos = function(){

		$http.get('::usuarios').then (function(result){
			$scope.usuarios = result.data ;
			console.log('Se trajo los datos con exito', result);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };
    $scope.traer_datos();

	$scope.mostrar_crear= function(){
		$scope.mostrando_crear= true;
		$scope.mostrar_boton= false;
		$location.hash('crear-usuario-div');
    	$anchorScroll();
	
	};
	
	$scope.salir_crear= function(){
		$location.hash('');
		$scope.mostrando_crear = false;
		$scope.mostrar_boton   	= true;
	};

	$scope.salir_editar= function(){
		$location.hash('');
		$scope.mostrando_editar = false;
		$scope.mostrar_boton   	= true;
	};
	
	
  	$scope.insertarUsuarios = function(crea){
	    
	    
  		if (crea.nombres == '' || crea.nombres == undefined) {
  			toastr.error('Debe escribir el nombre');
  			return;
  		}

  		if (crea.apellidos == '' || crea.apellidos == undefined) {
  			toastr.error('Debe escribir el apellido');
  			return;
  		}

  		if ($scope.opcion == '' || $scope.opcion == undefined) {
  			toastr.error('Debe escoger el sexo');
  			return;
  		}

  		if (crea.username == '' || crea.username == undefined) {
  			toastr.error('Debe escribir el username');
  			return;
  		}

  		if (crea.password == '' || crea.password == undefined) {
  			toastr.error('Debe escribir la contraseña');
  			return;
  		}

  		if (crea.passwordn == '' || crea.passwordn == undefined) {
  			toastr.error('Debe confirmar la contraseña');
  			return;
  		}

        if (crea.password != crea.passwordn) {
  			toastr.error('Las dos contraseñas no son iguales')
  			return;
  		}


  		$http.get('::usuarios/prueba_actual').then (function(result){
			
			$scope.prueba_actual = result.data ;
			
			console.log('Se trajo los datos con exito', );
			   if ($scope.prueba_actual.length == 0) {
			   	 toastr.error('Debe seleccionar una prueba para el usuario, para eso dirijase a pruebas y seleccionela.');
			   	 return;
			   };

			   $scope.datos_usuario = {nombres: crea.nombres, apellidos: crea.apellidos, sexo: $scope.opcion, username: crea.username, password: crea.password, prueba_id: $scope.prueba_actual[0].rowid, tipo: 'Usuario'};

			   $http.get('::usuarios/insertar', {params: $scope.datos_usuario}).then (function(result){
		       toastr.success('Usuario creado con éxito');
		       $scope.traer_datos();
		        console.log('Se insertaron los datos con exito', result);
		        
		     }, function(error){
		       console.log('No se pudo insertar los datos', error);

		     })
			 if ($scope.mostrando_crear == false) {
			 	$scope.mostrar_boton  	= true;
			 }
			
		
		});
	    
	    

    };



	$scope.abrirModal = function (usuario) {

    	var modalInstance = $uibModal.open({
			templateUrl: 'views/modalUsuario.html',
			controller: 'ModalUCtrl',
			animation: false,
			resolve: {
			    usuario: function () {
			    	return usuario;
			    }
			},
      	});

      	console.log(modalInstance);
            
  		modalInstance.result.then(function (usuariores) {
	     console.log(usuariores);
	    }, function () {
	      console.log();
	    });
        
    };
  
	$scope.editarU = function(cambia){

		$scope.mostrar_boton =  false;
		$scope.mostrando_crear 	= false;
		$scope.usuario = cambia;
		$scope.opcion = $scope.usuario.sexo;
		cambia.editando = true;
		$scope.mostrando_editar	= true;
		$location.hash('editar-usuario-div');
		$anchorScroll();

		if ($scope.opcion == 'M') {
			$scope.color_seleccion1 = true;
			$scope.color_seleccion2 = false;
		}else  {
		 	 if ($scope.opcion == 'F') {
		 	 	$scope.color_seleccion1 = false;
				$scope.color_seleccion2 = true;	
		 	 }
		};



	};
    $scope.editarUsuario = function(cambia){
	        

  		if (cambia.nombres == '' || cambia.nombres == undefined) {
  			toastr.error('Debe escribir el nombre');
  			return;
  		}

  		if (cambia.apellidos == '' || cambia.apellidos == undefined) {
  			toastr.error('Debe escribir el apellido');
  			return;
  		}

  		if (cambia.sexo == '' || cambia.sexo == undefined) {
  			toastr.error('Debe escoger el sexo');
  			return;
  		}

  		if (cambia.username == '' || cambia.username == undefined) {
  			toastr.error('Debe escribir el username');
  			return;
  		}

  		

	         $http.get('::usuarios/editar',  {params: { nombres: cambia.nombres, apellidos: cambia.apellidos, sexo: $scope.opcion, username: cambia.username, prueba_id: cambia.prueba_id, tipo: cambia.tipo,  rowid: cambia.rowid  } }).then (function(result){
                console.log('Se actualizaron los datos con exito', result);
                 toastr.success('Usuario editado con éxito');
                 $scope.mostrando_editar= false;
                 $scope.mostrar_boton  	= true;
                 $scope.traer_datos();
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
		  


     

   };
    $scope.eliminar_user = function(rowid){

		$http.delete('::usuarios/eliminar', {params: { id: rowid } }).then (function(result){
			toastr.success('Usuario eliminado con éxito');
			console.log('Se borraron los datos con exito', result);
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
		     $scope.eliminar_user(eliminar);
		    })
	    };
  

})
.controller('ModalUCtrl', function($scope, $uibModalInstance, usuario, $http, toastr){

   
    $scope.usuario = usuario;

	$scope.ok = function(usuario){
		
		if (usuario.password == '' || usuario.password == undefined) {
  			toastr.error('Debe escribir la contraseña');
  			retusuario
  		}

		$http.get('::usuarios/cambiar-pass', {params: {rowid: usuario.rowid, password: usuario.password}}).then (function(result){

			toastr.success('Se ha cambiado la contraseña con éxito');
			$uibModalInstance.close($scope.usuario);
			console.log('Se actualizaron los datos con exito', result);

		}, function(error){
			console.log('No se pudo actualizar los datos', error);

		})
			  

			
	};

	$scope.cancel = function () {
	   $uibModalInstance.dismiss('cancel');
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