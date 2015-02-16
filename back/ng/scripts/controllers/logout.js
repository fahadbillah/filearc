'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('LogoutCtrl', ['$scope', '$http', function ($scope,$http) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];



 	$http.get('api/auth/logout')
 	.success(function(data) {
 		console.log(data);
 		if (data.success === true) {
 			if (data.action.actionName === 'redirect') {
 				window.location.replace(data.action.url);
 			}
 		}
 	})
 	.error(function(data) {
 		console.log(data);
 	});
 }]);
