angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('galeriaCtrl', function($scope, $stateParams, $http) {
  $scope.galeria = [];
   $http.get('http://www.secretsex.com.br/mobile/json/gallery?id=' + $stateParams.galeriaid).then(function(resp) {        
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
  $http.get('https://vendelo-api.herokuapp.com/api/v1/artworks')
    .success(function(data, status, headers,config){
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
   $http.get('http://www.secretsex.com.br/mobile/json/user?id=' + $stateParams.perfilid).then(function(resp) {        
        $scope.perfil = resp.data.profile;       
      }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
      })

})
   
.controller('chatCtrl', function($scope) {

})
   
.controller('informacionCtrl', function($scope) {

})
   
.controller('salirCtrl', function($scope) {

})
    