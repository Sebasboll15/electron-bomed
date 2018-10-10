angular.module('app')


.controller('ControlCtrl', function($scope, $filter, MySocket, $uibModal, toastr){
  $scope.mostrando = false;
  $scope.boton1 	= true;
  $scope.clientes = [];


  $scope.actualizarClientes = function(){
    MySocket.emit('traer_clientes');
  }
    
   
  MySocket.on('alguien_logueado', function(datos){
    $scope.actualizarClientes();
  });
    

  MySocket.on('client_disconnected', function(datos){
    $scope.actualizarClientes();
  });
    

  MySocket.on('conectado:alguien', function(datos){
    $scope.actualizarClientes();
  });
    

  MySocket.emit('traer_clientes');
     

  MySocket.on('clientes_traidos',function(res){
    $scope.clientes = res ;
  });
      



  $scope.OpenModalUser = function (cliente) {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/ModalControlUser.html',
      controller: 'ModalControlUserCtrl',
      animation: false,
      resolve: {
          cliente: function () {
            return cliente;
          }
      },
    });
        
    modalInstance.result.then(function (clientes) {
      console.log(clientes);
    
    });
  
  };
    



})

.controller('ModalControlUserCtrl', function($scope, $uibModalInstance, $http, cliente, AuthServ, MySocket){

    $scope.cliente = cliente;
    
    $scope.ok = function(){
        
      $uibModalInstance.close($scope.cliente);  
   
    };
            
    $scope.cerrar_se = function(datos){  

      console.log(datos, 'jjjjj');

      MySocket.emit('cerrar_su_sesion', datos);
           
    };
          
    $scope.cancel = function () {
        
      $uibModalInstance.dismiss('cancel');

    }; 
});