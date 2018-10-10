angular.module('app')


.controller('ControlCtrl', function($scope, $filter, MySocket, $uibModal, toastr){
   $scope.mostrando = false;
	$scope.boton1 	= true;
     $scope.clientes = [];
    
     toastr.info('Cargando...');
 

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
      }, function () {
        console.log();
      });
    };
    



})

.controller('ModalControlUserCtrl', function($scope, $uibModalInstance, $http, cliente, AuthServ, MySocket){

        $scope.cliente = cliente;
        
      $scope.ok = function(){
        
        
          alert('Presionaste');
          $uibModalInstance.close($scope.cliente);
          
        
        };
            
      $scope.cerrar_se = function(datos){
            

            $scope.id= datos.id;

            console.log($scope.id, 'jjjjj');


            MySocket.emit('cierra_ su_sesion',  $scope.id);
            
          MySocket.on('sesion_cerrada', function(datos){
          console.log(datos);
          })


      };
          
      
      
      

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      }; 
});