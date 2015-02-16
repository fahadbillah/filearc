'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ngApp
 */
angular.module('ngApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
