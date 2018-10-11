angular.module('app')


  


  .controller('loginCtrl', function($scope, MySocket, $state, $http, $filter, $uibModal, AuthServ, toastr){
       
       $scope.user = {username: 'jorge', password: '123'}
    
    if (localStorage.servidor) {
    	$scope.servidor = localStorage.servidor
    } else {
    	$scope.servidor = location.hostname
    }
  	

  	$scope.mostrarCambiarServ = function(){
  		$scope.mostrar_cambiar_serv = !$scope.mostrar_cambiar_serv;
  	}

    
  	$scope.cambiar_servidor = function(servidor){
  		localStorage.servidor = servidor;
  	}

    
    $scope.iniciar = function(user){

        AuthServ.loguear(user).then(function(){
        	    toastr.info('Iniciando sesión...');
            $state.go('app.main');
        }, function(){
            toastr.error('Datos incorrectos');
        })
    
        
    }
       
   
    MySocket.on('te_conectaste', function(data){
       $scope.nombre_punto = data.datos.nombre_punto;
    });   
				
				
				



	

  });