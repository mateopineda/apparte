angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('obrasController', function($scope, $http) {
  $scope.result = "";
  $http.get('https://vast-reef-39722.herokuapp.com/api/v1/artworks')
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
});


