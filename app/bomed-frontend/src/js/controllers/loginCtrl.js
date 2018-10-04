angular.module('olimpiada_boom')


  .controller('MainCtrl', function(MySocket){

  })


  .controller('loginCtrl', function($scope, MySocket, $state, ConexionServ, $http, $filter, $uibModal, AuthServ){
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
        	
            $state.go('main');
        }, function(){
            alert('Datos incorrectos');
        })
    
        
    }
       
   
				
				
				



	

  });