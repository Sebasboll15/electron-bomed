angular.module('app')


.controller('ControlCtrl', function($scope, $filter, MySocket, $uibModal, toastr, $http){
  MySocket.emit('limpiar_pantalla');
  $scope.mostrando             = false;
  $scope.boton1 	             = true;
  $scope.clientes              = [];
  $scope.mostrar_participantes = false;
  $scope.mostrar_pregunta      = false;
  
  
  $scope.traer_datos = function(){
    $http.get('::Control').then (function(result){
          $scope.prueba = result.data;
          $scope.prueba_rowid = $scope.prueba[0].rowid;
          
          $http.get('::Control/preguntas', {params: {rowid: $scope.prueba_rowid}}).then (function(result){
          $scope.preguntas = result.data;
          console.log('burra', result);
          }, function(error){
          console.log('No se pudo traer los datos', error);

        })
    })

    
  };

  $scope.traer_datos();
  
   
  
  $scope.mandar_pregunta = function(pregunta){
    $scope.mostrar_participantes = false;
    $scope.mostrar_pregunta      = true;
    
    MySocket.emit('mostrar_pregunta', {pregunta: pregunta} );
  }

 /* $scope.eliminar_respuesta = function(examen){
    $http.put('::informes/borrar-examenes', {params: { id: rowid } }).then(function(r){
    examenes = r.data;
    $scope.examenes = $filter('orderBy')(examenes, '-puntaje');
   }, function(r2){
     toastr.error('Error calculando puntajes');
     console.log(r2)
   })
  
  } */
  

  $scope.actualizarClientes = function(){
    MySocket.emit('traer_clientes');

  };

  MySocket.on('clientes_traidos',function(res){
    $scope.clientes = res ;
  });

  MySocket.on('Ver_Par/Pre',function(res){
   if ($scope.mostrar_participantes == true) {
    $scope.show_participantes();
   }else {
      if ($scope.mostrar_pregunta == true) {
        $scope.mandar_pregunta(); 
    }
      

   } 
  });

   
  MySocket.on('respondido', function(datos){
    $scope.clientes = datos.clientes;
  });
  
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
   $scope.mostrar_participantes = true;
   $scope.mostrar_pregunta      = false;
  
   MySocket.emit('llevar_espectadorU');

  };

  $scope.mostrar_puestos = function(){
    $scope.mostrar_participantes = false;
    $scope.mostrar_pregunta      = false;
    MySocket.emit('mostrar_puestos', {examenes: $scope.examenes});
  };

  $scope.mandar_puesto = function(puesto){
    console.log('puesto', puesto.$index+1);
    $scope.mostrar_participantes = false;
    $scope.mostrar_pregunta      = false;
    MySocket.emit('mostrar_puesto', {examen: puesto.examen, posicion: puesto.$index+1} );
  }
  
  $scope.calcular_puntajes = function(){
   $http.put('::informes/calcular-examenes').then(function(r){
    examenes = r.data;
    console.log('gggg', examenes);
    $scope.examenes = $filter('orderBy')(examenes, '-puntaje');
   }, function(r2){
     toastr.error('Error calculando puntajes');
     console.log(r2)
   })

  };
  
  $scope.limpiar_pantalla = function(){
    $scope.mostrar_participantes = false;
    $scope.mostrar_pregunta      = false;
   
   
    MySocket.emit('limpiar_pantalla');
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