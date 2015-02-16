'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:SuccessCtrl
 * @description
 * # SuccessCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('SuccessCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	var successMessage = {
 		101: {
 			'title':'Registration Successfull!',
 			'body':'Please check your email and activate your account!'
 		},
 		102: {
 			'title':'Account activation Successfull!',
 			'body':'Please login!'
 		},
 		103:  {
 			'title':'File upload successfull!',
 			'body':'Thanks for your contribution!'
 		},
 	};

 	$scope.message = successMessage[$routeParams.successId];

 	console.log(successMessage[$routeParams.successId]);

 }]);
