angular.module('app')

.controller('ModalUCtrl', function($scope, $uibModalInstance, usuario, $http, toastr){

   
    $scope.usuario = usuario;

	$scope.ok = function(usuario){
		
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
});