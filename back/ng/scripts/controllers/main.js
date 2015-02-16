'use strict';

/**
* @ngdoc function
* @name ngApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the ngApp
*/
angular.module('ngApp')
.controller('MainCtrl',['$scope','$http','$location','baseURL', function ($scope,$http,$location,baseURL) {
  $scope.awesomeThings = [
  'HTML5 Boilerplate',
  'AngularJS',
  'Karma'
  ];


  $scope.baseUrl = baseURL;

  $scope.files = [];

  $scope.loading = false;

  $scope.getRecentFiles = function() {
    $scope.loading = true;
    var limit = 5;
    var offset = $scope.files.length;
    $http.get('api/file/get_recent_files/'+limit+'/'+offset)
    .success(function(data) {
      console.log(data.data);
      if (data.success === true) {
        angular.forEach(data.data, function(elm, idx) {
          $scope.files.push(elm);
        })
        $scope.loading = false;
      }
    })
    .error(function(data) {
      console.log(data);
    });
  };

  $scope.getRecentFiles();

  $scope.createFileName = function(file) {
    var ext = file.file_url.split('/');
    ext = ext[ext.length-1];
    return ext;
  };

  $scope.goToDetails = function(fileId) {
    $location.path('filedetails/' + fileId);
  }

}]);
