'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:FacultyapplicationCtrl
 * @description
 * # FacultyapplicationCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('FacultyapplicationCtrl',['$scope','$http', function ($scope,$http) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];


 	$scope.application = {
 		application: '',
 		faculty: '',
 		chairman: '',
 	}


 	var getMyProfileInfo = function() {
 		$http.get('api/index.php/file/get_my_profile_info')
 		.success(function(data) {
 			$scope.application.faculty = data.info[0].first_name+' '+data.info[0].last_name;
 			console.log(data);
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	};

 	getMyProfileInfo();


 	$scope.searchAdditionalInfo = function() {
 		$http.get('api/index.php/admin/search_additional_info/'+encodeURIComponent($scope.search))
 		.success(function(data) {
 			console.log(data);
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	}
 	$scope.allAdditionalInfo = [];

 	var loadAdditionalInfo = function() {
 		$http.get('api/index.php/admin/get_all_additional_info')
 		.success(function(data) {
 			if(data.success === true){
 				$scope.allAdditionalInfo = data.data;
 			}else{
 			}
 			console.log(data);
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	}

 	loadAdditionalInfo();

 }]);
