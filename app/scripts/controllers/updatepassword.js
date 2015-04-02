'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:UpdatepasswordCtrl
 * @description
 * # UpdatepasswordCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('UpdatepasswordCtrl', ['$scope','$routeParams','$http', function ($scope,$routeParams,$http) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	console.log($routeParams['activationCode']);


 	$scope.updatePassword  = function() {
 		var updatePass = {
 			'activation_code' : $routeParams['activationCode'],
 			'password' : updatePasswordForm.elements.password.value,
 			'repassword' : updatePasswordForm.elements.repassword.value,
 		}


 		$http.post('api/index.php/auth/update_password',updatePass)
 		.success(function(data) {

 			if (data.success === false) {
 				$scope.error.className = 'alert-danger';
 			}else{
 				$scope.error.className = 'alert-success';
 			}
 			$scope.error.title = data.message.title;
 			$scope.error.body = data.message.body;
 			setTimeout(function(){
 				$scope.error.className = 'hidden';
 				$scope.error.title = '';
 				$scope.error.body = '';
 			},2000);
 			console.log(data);
 		})
 		.error(function(data) {
 			console.log(data);
 		})
 	}


 	$scope.error = {
 		'className': 'hidden',
 		'title': '',
 		'body': ''
 	};
 }]);
