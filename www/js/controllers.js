angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $http, $state) {
   $scope.data = {};
    $scope.login = function() {
      localStorage.clear();  
      $http.post("https://vendelo-api.herokuapp.com/api/v1/login", 
    {"auth":{"email":$scope.data.username,"password":$scope.data.password}}).then(function(resp) {       
        $scope.token = resp.data['jwt'];
        localStorage.setItem("token", $scope.token);
        $state.go('menu.obras');
      }, function(err) {
        console.error('ERR', err);
        document.getElementById('fallo').innerHTML = 'Intente de nuevo, las credenciales fallaron';
        $state.go('login');
        // err.status will contain the status code
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

})
   
.controller('obrasCtrl', function($scope, $http) {
	$scope.result = "";
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
   
.controller('chatCtrl', function($scope) {

})
   
.controller('chatsCtrl', function($scope) {

})

.controller('informacionCtrl', function($scope) {

})
   
.controller('salirCtrl', function($scope) {

})
    