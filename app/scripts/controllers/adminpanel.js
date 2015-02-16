'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:AdminpanelCtrl
 * @description
 * # AdminpanelCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('AdminpanelCtrl', ['$scope','$http', function ($scope,$http) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	// $scope.users = [];

 	var allUsers = [];
 	var allFaculty = [];

 	$scope.search = '';

 	$scope.findByEmail = function() {
 		var re = new RegExp($scope.search,"gi");
 		$scope.users = [];
 		$scope.faculties = [];
 		angular.forEach(allUsers, function(elm,idx) {
 			// console.log(elm.email.match(re));
 			if (elm.email.match(re)!==null && elm.email.match(re).length>0) {
 				$scope.users.push(elm)
 			};
 		})
 		angular.forEach(allFaculty, function(elm,idx) {
 			// console.log(elm.email.match(re));
 			if (elm.email.match(re)!==null && elm.email.match(re).length>0) {
 				$scope.faculties.push(elm)
 			};
 		})


 	}

 	$scope.makeFaculty = function(id) {
 		var sendData = {
 			id_users: id
 		};
 		$http.post('api/index.php/admin/make_faculty', sendData)
 		.success(function(data) {
 			console.log(data);
 			if (data.success === true) {
 				getAllNonFaculty();
 				getAllFaculty();
 			};
 			alert(data.message.title);
 		})
 		.error(function(data) {
 			console.log(data);
 		})
 	}
 	

 	var getAllFaculty = function() {
 		$http.get('api/index.php/admin/get_all_faculty')
 		.success(function(data) {
 			console.log(data);
 			allFaculty = data.data;
 			getAllNonFaculty();
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	}

 	getAllFaculty();

 	var getAllNonFaculty = function() {
 		$http.get('api/index.php/admin/get_all_non_faculty')
 		.success(function(data) {
 			console.log(data);
 			allUsers = data.data;
 			$scope.findByEmail();
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	}

 	getAllNonFaculty();
 }]);
