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
  var allFiles = [];

  $scope.loading = false;

  $scope.itemVisible = 5;

  var getRecentFiles = function() {
    $scope.loading = true;
    var limit = 5;
    var offset = $scope.files.length;
    $http.get('api/index.php/file/get_recent_files/'+limit+'/'+offset)
    .success(function(data) {
      console.log(data.data);
      if (data.success === true) {
        angular.forEach(data.data, function(elm, idx) {
          $scope.files.push(elm);
          allFiles.push(elm);
        })
        $scope.loading = false;
      }
    })
    .error(function(data) {
      console.log(data);
    });
  };

  getRecentFiles();

  $scope.loadMore = function() {
    $scope.itemVisible += 5;
  }

  $scope.createFileName = function(file) {
    var ext = file.file_url.split('/');
    ext = ext[ext.length-1];
    return ext;
  };

  $scope.search = '';

  $scope.searchFile = function() {
    console.log($scope.search);
    $scope.search = $.trim($scope.search);
    $scope.files = [];
    var rgx = new RegExp($scope.search,"gi");
    var tokenized = $scope.search.split(' ');
    angular.forEach(allFiles, function(elm,idx) {
      if (elm.file_title.match(rgx)!==null && elm.file_title.match(rgx).length>0) {
        $scope.files.push(elm)
      };
      angular.forEach(elm.tags,function(e,i) {
        angular.forEach(tokenized, function(el,id) {
          if (e.tag_name == el)
            $scope.files.push(elm)
        })
      });
    })

  }

  $scope.goToDetails = function(fileId) {
    $location.path('filedetails/' + fileId);
  }

}]);
