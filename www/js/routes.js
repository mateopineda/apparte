angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registro', {
    url: '/registro',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })

  .state('galeria', {
    url: '/galeria/:galeriaid',
    templateUrl: 'templates/galeria.html',    
    controller: 'galeriaCtrl'
  })

  .state('menu.filtro', {
    url: '/filtro',
    views: {
      'side-menu21': {
        templateUrl: 'templates/filtro.html',
        controller: 'filtroCtrl'
      }
    }
  })

  .state('menu.obras', {
    url: '/obras',
    views: {
      'side-menu21': {
        templateUrl: 'templates/obras.html',
        controller: 'obrasCtrl'
      }
    }
  })

  .state('menu.crearobra', {
  url: '/crear',
  views: {
    'side-menu21': {
      templateUrl: 'templates/crear.html',
      controller: 'crearCtrl'
    }
  }
})

  .state('menu.perfil', {
    url: '/perfil/:perfilid',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.mensajes', {
    url: '/mensajes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mensajes.html',
        controller: 'mensajesCtrl'
      }
    }
  })


  .state('menu.chat', {
    url: '/chat',
    views: {
      'side-menu21': {
    templateUrl: 'templates/chat.html',    
    controller: 'chatCtrl'
      }
    }
  })

  .state('menu.informacion', {
    url: '/informacion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/informacion.html',
        controller: 'informacionCtrl'
      }
    }
  })


  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl',
    abstract:true
  })

$urlRouterProvider.otherwise('/login')

  

});