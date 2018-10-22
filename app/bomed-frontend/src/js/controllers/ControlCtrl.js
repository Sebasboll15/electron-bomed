angular.module('app')


.controller('ControlCtrl', function($scope, $filter, MySocket, $uibModal, toastr){
  $scope.mostrando             = false;
  $scope.boton1 	             = true;
  $scope.clientes              = [];
  $scope.mostrar_participantes = true;
  $scope.clientes_screen       = [];
  $scope.participantes         = [];

  

  $scope.actualizarClientes = function(){
    MySocket.emit('traer_clientes');

  };

  MySocket.on('clientes_traidos',function(res){
    console.log(res);
    $scope.clientes = res ;
    

  });


  $scope.traer_participantes = function(){

    for (var i = 0; i < $scope.clientes.length; i++) {
      if ($scope.clientes[i].user_data.prueba_id =='') {

      } 
    }
  

  }
  

   
  MySocket.on('alguien_logueado', function(datos){
    $scope.actualizarClientes();
  });
    
  MySocket.on('datos_logueo_recibidos', function(datos){
    $scope.actualizarClientes();
  });
  
  MySocket.on('te_logueaste', function(datos){
    $scope.actualizarClientes();
  });
    

  MySocket.on('client_disconnected', function(datos){
    $scope.actualizarClientes();
  });
    

  MySocket.on('conectado:alguien', function(datos){
    $scope.actualizarClientes();
  });
    

  MySocket.emit('traer_clientes');
     

  
      
  $scope.show_participantes = function(){

    if ($scope.mostrar_participantes == true) {
        $scope.mostrar_participantes = false;
    }else {
     $scope.mostrar_participantes = true; 
    }


    $scope.datos = {clientes_participantes: $scope.clientes }
    

    MySocket.emit('Mandar_participantes', $scope.datos);

  };




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

.controller('ModalControlUserCtrl', function($scope, $uibModalInstance, $http, cliente, AuthServ, MySocket, toastr){

    $scope.cliente = cliente;
     console.log('usuariotttt', $scope.cliente);
      
    $scope.cliente_existe = false;

    if ($scope.cliente.user_data.rowid) {
      $scope.cliente_existe = true;

    }else{

       $http.get('::usuarios_de_control').then (function(result){
        $scope.usuarios = result.data ;
        console.log('Se trajo los datos con exito', result);
      }, function(error){
        console.log('No se pudo traer los datos', error);

      })

    }

    $scope.actualizarClientes = function(){
      
      MySocket.emit('traer_clientes');

    };

    $scope.ok = function(){
        
      $uibModalInstance.close($scope.cliente);  
       $scope.actualizarClientes();

    };

    $scope.cancel = function () {
        
      $uibModalInstance.dismiss('cancel');
      $scope.actualizarClientes();

    }; 
            
    $scope.cerrar_se = function(datos){  

      
      MySocket.emit('cerrar_su_sesion', datos);
      $scope.cancel();
      toastr.success('Se ha cerrado la sesión con éxito')
     
    };

     

    $scope.put_user = function(user){  
      console.log('usuario', user);
      
      data = {username: user.username , password: user.password, nombre_punto: $scope.cliente.nombre_punto, resourceId: $scope.cliente.resourceId};
      
      MySocket.emit('abrirle_la_sesion', data);

      $scope.cancel();
      toastr.success('Usuario asignado');
     
    };
          
   
});