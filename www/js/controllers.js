angular.module('app.controllers', [])


.controller('menuCtrl', function($scope, $http, $state) {  
document.getElementById('nombre').innerHTML = localStorage.getItem("full_name");
if (localStorage.getItem("role")=="client"){
	document.getElementById("crear").style.visibility="hidden";  
}
})

.controller('loginCtrl', function($scope, $http, $state) {
   $scope.data = {};
    $scope.login = function() {
      localStorage.clear();  
      $http.post("https://vendelo-api.herokuapp.com/api/v1/login", 
    {"auth":{"email":$scope.data.username,"password":$scope.data.password}}).then(function(resp) {
    	console.log(resp.data);
        $scope.token = resp.data.user['jwt'];
        $scope.id = resp.data.user['id'];
        $scope.full_name = resp.data.user['full_name'];
        $scope.role = resp.data.user['role'];
        localStorage.setItem("token", $scope.token);
        localStorage.setItem("id", $scope.id );
        localStorage.setItem("full_name", $scope.full_name );
        localStorage.setItem("role", $scope.role );
        $state.go('menu.obras');
      }, function(err) {
        console.error('ERR', err);
        document.getElementById('fallo').innerHTML = 'Intente de nuevo, las credenciales fallaron';
        $state.go('login');
        // err.status will contain the status code
      })
      }
})

.controller('registroCtrl', function($scope, $http, $state) {
   $scope.data = {};
    $scope.registro = function() {
    	elem=document.getElementById('role');   
      $http.post("https://vendelo-api.herokuapp.com/api/v1/users", 
    {"user":{"email":$scope.data.email,"password":$scope.data.password,"full_name":$scope.data.full_name,"role":elem.value}}).then(function(resp) {
        $state.go('login');
      }, function(err) {
        console.error('ERR', err);
        document.getElementById('resultado').innerHTML = 'Intente de nuevo, hay datos faltantes o error en los mismos';
        $state.go('registro');
      })
      }
})

.controller('crearCtrl', function($scope, $http, $state) {
   $scope.data = {};
    $scope.registrar = function() {
    	console.log($scope.data);
      $http.post("https://vendelo-api.herokuapp.com/api/v1/artworks", 
    {"artwork":{"name":$scope.data.name,"description":$scope.data.description,"price":$scope.data.price}},
    {headers: {'Authorization':'Bearer ' + localStorage.getItem("token")}}).then(function(resp) {
        $state.go('menu.obras');
      }, function(err) {
        console.error('ERR', err);
        document.getElementById('malo').innerHTML = 'Intente de nuevo, hay datos faltantes o error en los mismos';
        $state.go('crear');
      })
      }
})
  
.controller('galeriaCtrl', function($scope, $stateParams, $http) {
  $scope.galeria = [];
   $http.get('https://vendelo-api.herokuapp.com/api/v1/gallery?id=' + $stateParams.galeriaid).then(function(resp) {        
        $scope.galeria = resp.data.gallery;
             
      }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
      })

})
   
.controller('filtroCtrl', function($scope) {
$scope.rangoPrecio = function (val){
  document.getElementById('valor').innerHTML="$ "+ val;
}
})
   
.controller('obrasCtrl', function($scope, $http) {
	$scope.result = "";
	$scope.current_user = localStorage.getItem("id");
  $http.get('https://vendelo-api.herokuapp.com/api/v1/artworks', {
    headers: {'Authorization':'Bearer ' + localStorage.getItem("token")}
}).success(function(data, status, headers,config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.result = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });

  $scope.enviarLike = function(id) {   
    $http.post("https://vendelo-api.herokuapp.com/api/v1/artworks/" + id + "/votes",
    {'vote':{ 'score':'excellent'}},
    {headers: {'Authorization':'Bearer ' + localStorage.getItem("token")}}).then(function(resp) { 
    console.log("data success");
    }, function(err) {
      console.error('ERR', err);
    })
    }

})

.controller('perfilCtrl', function($scope, $stateParams, $http) {
	$scope.perfil = [];
   $http.get('https://vendelo-api.herokuapp.com/api/v1/user?id=' + $stateParams.perfilid).then(function(resp) {        
        $scope.perfil = resp.data.profile;       
      }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
      })

})

.controller('chatCtrl', function($scope, $http) {
$http.post('https://vendelo-api.herokuapp.com/api/v1/artworks/'+ 1 + '/talks', {
    headers: {'Authorization':'Bearer ' + localStorage.getItem("token")}
});
$scope.chat = {};
$scope.cargarMensajes = function() {
$scope.result = "";
  $http.get('https://vendelo-api.herokuapp.com/api/v1/talks/'+ 1, {
    headers: {'Authorization':'Bearer ' + localStorage.getItem("token")}
}).success(function(data, status, headers,config){
      console.log('data success');
      console.log(data); // for browser console
      document.getElementById('obra').innerHTML = 'Negociando por: ' + data.artwork.name;
      if (data.status=="open") {
        document.getElementById("estado").style.backgroundImage = "url('img/chat1.jpg')";
      }
      else {
        document.getElementById("estado").style.backgroundImage = "url('img/chat2.jpg')";
      }
      $scope.result = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });
  }
  $scope.cargarMensajes();
  $scope.enviarMensaje = function() {  
    $http.post("https://vendelo-api.herokuapp.com/api/v1/talks/"+ 1 +"/messages", 
    {'body': $scope.chat.message} ,
    {headers: {'Authorization':'Bearer ' + localStorage.getItem("token")}}).then(function(resp) { 
    console.log("data success");
    document.getElementById('mensaje').value = "";
    $scope.cargarMensajes();        
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    }
})
   
.controller('mensajesCtrl', function($scope, $http) {
$scope.result = "";
  $http.get('https://vendelo-api.herokuapp.com/api/v1/talks/'+ 1, {
    headers: {'Authorization':'Bearer ' + localStorage.getItem("token")}
}).success(function(data, status, headers,config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.result = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });
  })

.controller('informacionCtrl', function($scope) {

})
   
    