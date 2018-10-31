angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/login');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    controller: 'DashboardCtrl',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Flags',
          files: ['node_modules/flag-icon-css/css/flag-icon.min.css']
        },{
          serie: true,
          name: 'Font Awesome',
          files: ['node_modules/font-awesome/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'node_modules/chart.js/dist/Chart.min.js',
            'node_modules/angular-chart.js/dist/angular-chart.min.js',
            'js/controllers/DashboardCtrl.js'
          ]
        }]);
      }],
      USER: ['AuthServ', function(AuthServ, MySocket){
        return AuthServ.verificar_user_logueado();
      }]
      
    }
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/main.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'node_modules/chart.js/dist/Chart.min.js',
              'node_modules/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/main.js']
        });
      }]
    }
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['node_modules/font-awesome/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
        }]);
      }],
    }
  })
  
  .state('app.main.espectador', {
    url: '/espectador',
     controller: 'espectadorCtrl',
    templateUrl: 'views/espectador.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para el espectador' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/espectadorCtrl.js']
        });
      }]
    }
  })

  .state('app.main.espectador.puntos', {
    url: '/puntos',
     controller: 'espectador-puntosCtrl',
    templateUrl: 'views/puntos.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para el espectador' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/espectador-puntosCtrl.js']
        });
      }]
    }
  })

  .state('app.main.espectador.participantes', {
    url: '/participantes',
     controller: 'espectador-participantesCtrl',
    templateUrl: 'views/participantes.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para el espectador' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/espectador-participantesCtrl.js']
        });
      }]
    }
  })

  .state('app.main.espectador.pregunta', {
    url: '/pregunta',
     controller: 'espectador-preguntaCtrl',
    templateUrl: 'views/pregunta.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para el espectador' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/espectador-preguntaCtrl.js']
        });
      }]
    }
  })

  .state('app.usuarios', {
    url: '/usuarios',
     controller: 'usuariosCtrl',
    templateUrl: 'views/usuarios.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para ver y editar los usuarios' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/usuariosCtrl.js']
        });
      }]
    }
  })

  .state('app.pruebas', {
    url: '/pruebas',
     controller: 'pruebasCtrl',
    templateUrl: 'views/pruebas.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para ver y editar las pruebas' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/pruebasCtrl.js']
        });
      }]
    }
  })

  .state('app.preguntas', {
    url: '/preguntas',
    controller: 'preguntasCtrl',
    templateUrl: 'views/preguntas.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para ver y editar las preguntas' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/preguntasCtrl.js']
        });
      }]
    }
  })

  .state('app.respuestas', {
    url: '/respuestas',
     controller: 'respuestasCtrl',
    templateUrl: 'views/respuestas.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para ver  las respuestas' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/respuestasCtrl.js']
        });
      }]
    }
  })

  .state('app.control', {
    url: '/control',
     controller: 'ControlCtrl',
    templateUrl: 'views/control.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para coordinar las pruebas' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/ControlCtrl.js']
        });
      }]
    }
  })

  .state('app.prueba_respuestas', {
    url: '/Prueba_en_curso',
     controller: 'Prueba_respuestasCtrl',
    templateUrl: 'views/prueba_respuestas.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Realizar la prueba' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/Prueba_respuestasCtrl.js']
        });
      }]
    }
  })

  .state('login', {
    url: '/login',
     controller: 'loginCtrl',
    templateUrl: 'views/login.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    },
    //page subtitle goes here
    params: { subtitle: 'Para ingresar a inicio' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load({
          files: ['js/controllers/loginCtrl.js']
        });
      }]
    }
  })

  // Additional Pages
  
  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })
}]);
