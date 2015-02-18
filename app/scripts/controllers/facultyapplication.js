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
 		student: '',
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
 	$scope.search = '';

 	$scope.searchAdditionalInfo = function(search) {
 		$scope.resultArray = [];
 		if (search ==''){
 			return;
 		}
 		angular.forEach($scope.allAdditionalInfo,function(e,i){
 			var string = new RegExp(search,"i");
 			if(e.additional_info_name.search(string) >= 0){
 				$scope.resultArray.push(e);
 			}
 		});
 		console.log($scope.resultArray);
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

 	$scope.clearResult = function() {
 		$scope.resultArray = [];
 	}

 	$scope.showPrint = false;
 	$scope.togglePrintShow = function() {

 		$scope.showPrint = $scope.showPrint ? false : true;

 	}



 	$scope.searchStudent = '';

 	$scope.searchStudentInfo = function(search) {
 		$scope.resultArray = [];
 		if (search ==''){
 			return;
 		}
 		angular.forEach($scope.allStudents,function(e,i){
 			var string = new RegExp(search,"i");
 			if(e.academic_id.search(string) >= 0){
 				$scope.resultArray.push(e);
 			}
 		});
 		console.log($scope.resultArray);
 	}

 	$scope.allStudents = [];

 	var getAllStudent = function() {
 		$http.get('api/index.php/admin/get_all_student')
 		.success(function(data) {
 			if(data.success === true){
 				$scope.allStudents = data.data;
 			}else{
 			}
 			console.log(data);
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	}
 	getAllStudent();
 }]);
