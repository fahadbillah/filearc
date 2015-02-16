'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('AuthCtrl', ['$scope', '$http', function ($scope,$http) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];


 	var apiCall = function() {
 		$http.get('api/index.php/auth')
 		.success(function(data) {
 			if (data.success === false) {
 				$scope.error.className = 'alert-danger';
 				$scope.error.title = data.message.title;
 				$scope.error.body = data.message.body;
 				setTimeout(function(){
 					$scope.error.className = 'hidden';
 					$scope.error.title = '';
 					$scope.error.body = '';
 				},2000);
 			}else{
 				window.location.replace(data.action.url);
 			}
 		})
 		.error(function(data) {
 			console.log('http error occured!');
 			console.log(data);
 		});
 	};

 	apiCall();

 	$scope.form = {
 		'firstName':'',
 		'lastName':'',
 		'email':'',
 		'academicId':'',
 		'password':'',
 		'rePassword':'',
 		'login':'',
 		'pass':'',
 	};


 	$scope.login = function() {
 		var loginData = {
 			'login': $scope.form.login.trim(),
 			'password': $scope.form.pass.trim(),
 		};

 		$http.post('api/index.php/auth/login',loginData)
 		.success(function(data) {
 			console.log(data);
 			if (data.success === false) {
 				$scope.error.className = 'alert-danger';
 				$scope.error.title = data.message.title;
 				$scope.error.body = data.message.body;
 				setTimeout(function(){
 					$scope.error.className = 'hidden';
 					$scope.error.title = '';
 					$scope.error.body = '';
 				},2000);
 			}else{
 				window.location.replace(data.action.url);
 			}
 		})
 		.error(function(data) {
 			console.log('http error occured!');
 			console.log(data);
 		});
 	};

 	$scope.error = {
 		'className': 'hidden',
 		'title': '',
 		'body': ''
 	};

 	$scope.passwordMatch = function() {
 		if ($scope.form.password.trim() !== $scope.form.rePassword.trim()) {
 			$scope.error.className = 'alert-danger';
 			$scope.error.title = 'Password Missmatch';
 			setTimeout(function(){
 				$scope.error.className = 'hidden';
 				$scope.error.title = '';
 			},2000);
 		}else{
 			$scope.error.className = 'hidden';
 			$scope.error.title = '';
 		}
 	};

 	$scope.emailCheck = function() {
 		$http.post('api/index.php/auth/email_check',{email:$scope.form.email.trim()})
 		.success(function(data) {
 			console.log(data);
 			if (data.success === false) {
 				$scope.error.className = 'alert-danger';
 				$scope.error.title = data.message.title;
 				$scope.error.body = data.message.body;
 				setTimeout(function(){
 					$scope.error.className = 'hidden';
 					$scope.error.title = '';
 					$scope.error.body = '';
 				},2000);
 			}
 		})
 		.error(function(data) {
 			console.log('http error occured!');
 			console.log(data);
 		});
 	};

 	$scope.academicIdCheck = function() {
 		$http.get('api/index.php/auth/academic_id_check/'+encodeURIComponent($scope.form.academicId.trim()))
 		.success(function(data) {
 			console.log(data);
 			if (data.success === false) {
 				$scope.error.className = 'alert-danger';
 				$scope.error.title = data.message.title;
 				$scope.error.body = data.message.body;
 				setTimeout(function(){
 					$scope.error.className = 'hidden';
 					$scope.error.title = '';
 					$scope.error.body = '';
 				},2000);
 			}
 		})
 		.error(function(data) {
 			console.log('http error occured!');
 			console.log(data);
 		});
 	};


 	$scope.registration = function() {
 		var registrationData = {
 			'firstName': $scope.form.firstName.trim(),
 			'lastName': $scope.form.lastName.trim(),
 			'email': $scope.form.email.trim(),
 			'academicId': $scope.form.academicId.trim(),
 			'password': $scope.form.password.trim(),
 			'rePassword': $scope.form.rePassword.trim(),
 		};

 		angular.forEach(registrationData, function(val, idx) {
 			if (val==='') {
 				$scope.error.className = 'alert-danger';
 				$scope.error.title = idx+' field empty!';
 				setTimeout(function(){
 					$scope.error.className = 'hidden';
 					$scope.error.title = '';
 				},2000);
 				return false;
 			}
 		});

 		if (registrationData.password !== registrationData.rePassword) {
 			$scope.error.className = 'alert-danger';
 			$scope.error.title = 'Password Missmatch';
 			setTimeout(function(){
 				$scope.error.className = 'hidden';
 				$scope.error.title = '';
 			},2000);
 			return false;
 		}

 		$scope.makeDisable = true;
 		$http.post('api/index.php/auth/registration',registrationData)
 		.success(function(data) {
 			$scope.makeDisable = false;
 			console.log(data);
 			if (data.success === false) {
 				$scope.error.className = 'alert-danger';
 				$scope.error.title = data.message.title;
 				$scope.error.body = data.message.body;
 				setTimeout(function(){
 					$scope.error.className = 'hidden';
 					$scope.error.title = '';
 					$scope.error.body = '';
 				},2000);
 			}else{
 				window.location.replace('#/success/101');
 			}
 		})
 		.error(function(data) {
 			console.log('http error occured!');
 			$scope.makeDisable = false;
 			console.log(data);
 		});

 	};

 }]);
