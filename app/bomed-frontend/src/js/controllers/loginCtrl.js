angular.module('app')

  .controller('loginCtrl', function($scope, MySocket, $state, $http, $filter, $rootScope, AuthServ, toastr, MySocket){
   
   $scope.user = {username: 'jorge', password: '123'};   
    
    MySocket.on('sesion_A_cerrar', function (){
               
        toastr.info('Cerrando sesión...');
        AuthServ.cerrar_sesion();
    
    })

    
    if ($rootScope.sesion_cerrada) {
        location.reload();
    }
    
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

     
    MySocket.on('a_abrir_sesion', function(data){
      

        AuthServ.loguear(data).then(function(){
            toastr.info('Iniciando sesión...');
            $state.go('app.main');
        }, function(){
            toastr.error('Datos incorrectos');
        })
    


    });   
           
				
				
				



	

  });