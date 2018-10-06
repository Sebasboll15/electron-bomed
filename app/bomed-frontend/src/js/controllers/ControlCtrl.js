angular.module('app')


.controller('ControlCtrl', function($scope, $filter, MySocket, $uibModal){
   $scope.mostrando = false;
	$scope.boton1 	= true;
     $scope.clientes = [];
    
    
 

    setTimeout(function(){

       MySocket.emit('tomen_mis_datos');

       }, 1000);
       
       MySocket.on('alguien_logueado', function(datos){
        setTimeout(function(){  MySocket.emit('traer_clientes')

          }, 1000);


        });
    
    MySocket.on('clientes_traidos',function(res){
       
          $scope.clientes = res ;
           console.log('hola', $scope.clientes);
    })
 

    $scope.OpenModalUser = function (cliente) {

      var modalInstance = $uibModal.open({
      templateUrl: 'dist/templates/ModalControlUser.html',
      controller: 'ModalControlUserCtrl',
      resolve: {
          cliente: function () {
            return cliente;
          }
      },
        })
    }
    



});