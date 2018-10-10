angular.module('app')

.factory('MySocket', ['$q', '$rootScope', '$timeout', '$http', '$state', '$filter', function($q, $rootScope, $timeout, $http, $state, $filter){



	// Open a WebSocket connection
	// Verifico que no tenga puerto asignado
	dominio 	= location.hostname;

	if (localStorage.servidor) {
		dominio 	= localStorage.servidor;
	}


	//url 		= 'ws://' + dominio + ':8787';
	var socket = io.connect(dominio + ':8787');



	socket.on('connect', function(data){
		console.log('Conectado');
	});

	socket.on('te_conectaste', function(data){

		if (!localStorage.getItem('registered_boolean')){
			localStorage.registered_boolean = false
		}

		if (localStorage.getItem('registered_boolean')) {
			registered = localStorage.getItem('registered_boolean')
		}else{
			registered = false
		}

		if (registered=='false') {
			registered = false;
		}

		

		if (localStorage.USER){
			usu = JSON.parse(localStorage.USER);

			if (usu.rowid) {
				
				socket.emit('loguear', {usuario: usu, registered: registered } )
			}
		}



	});

	socket.on('logueado:yo', function(data){
		
		$rootScope.$emit('logueado:yo:agregado_a_arrays', data.yo)

	});
	

	//on enter() #en LoginCtrl y PanelCtrl



	// Metodos externos
	methods = {
		on: function(eventName, callback){
			socket.on(eventName, function(){
				args = arguments;
				$rootScope.$apply( function(){
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				args = arguments;
				$rootScope.$apply( function(){
					if (callback){
						callback.apply(socket, args);
					}
				});
			});
		}
	}

	return methods


}])


