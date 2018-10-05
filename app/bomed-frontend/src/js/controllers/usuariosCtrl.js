angular.module('app')


.controller('usuariosCtrl', function($scope, $http, $filter){
	$scope.mostrando= false;
	$scope.boton1= true;
	$scope.usuarios= {};
    
    $scope.traer_datos = function(){

		$http.get('::usuarios').then (function(result){
			$scope.usuarios = result.data ;
			console.log('Se trajo los datos con exito', result);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };
    $scope.traer_datos();

	$scope.mostrar= function(){
		$scope.mostrando= true;
		$scope.bsoton1= false;
	
	};
	$scope.salir= function(){
		$scope.mostrando= false;
	};
	
	
  	$scope.insertarUsuarios = function(crea){
	         
        if (crea.password != crea.passwordn) {
  			alert('Las dos contraseñas no son iguales')
  			return;
  		}
	    
	     $http.get('::usuarios/insertar', {params: {nombres: crea.nombres, apellidos: crea.apellidos, sexo: crea.sexo, username: crea.username, password: crea.password, tipo: crea.tipo  }  }).then (function(result){
	     
	       $scope.traer_datos();
	        console.log('Se insertaron los datos con exito', result);
	        
	     }, function(error){
	       console.log('No se pudo insertar los datos', error);

	     })

    };



	$scope.abrirModal = function (usuario) {

    	var modalInstance = $uibModal.open({
			templateUrl: 'dist/templates/modalUsuario.html',
			controller: 'ModalUCtrl',
			resolve: {
			    usuario: function () {
			    	return usuario;
			    }
			},
      	})
            
  		modalInstance.result.then(function (usuariores) {
	     console.log(usuariores);
	    }, function () {
	      console.log();
	    });
        
    };
  
    $scope.editarU = function(cambia){
      for (var i = 0; i < $scope.usuarios.length; i++) {
			$scope.usuarios[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    $scope.editarUsuario = function(cambia){
	        
	         $http.get('::usuarios/editar',  {params: { rowid: cambia.rowid, nombres: cambia.nombres, apellidos: cambia.apellidos, sexo: cambia.sexo, username: cambia.username, prueba_id: cambia.prueba_id, tipo: cambia.tipo  } }).then (function(result){
                console.log('Se actualizaron los datos con exito', result);
                 $scope.traer_datos();
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
		  


     

   };
    $scope.eliminar_user = function(rowid){

		$http.delete('::usuarios/eliminar', {params: { id: rowid } }).then (function(result){
			console.log('Se borraron los datos con exito', result);
            $scope.traer_datos();
		}, function(error){
			console.log('No se pudo borrarlos datos', error);

		})

    };
  







			

       

  
});
 

