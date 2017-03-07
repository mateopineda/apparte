angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('obrasController', function($scope, $http) {
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

.controller('chatController', function($scope, $http) {
  $scope.chats = "";
  $http.get('https://vendelo-api.herokuapp.com/api/v1/talks')
    .success(function(data, status, headers,config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.chats = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(chats){
      things = chats.data;
    });
});




