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
 		student: {},
 		faculty: '',
 		chairman: '',
 		semester: '',
 		course: '',
 		type: '',
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


 				// angular.forEach(data.data, function(e,i) {
 				// 	console.log(e);
 				// 	application.chairman = '';
 				// })
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

 	$scope.showPrint = true;
 	$scope.togglePrintShow = function() {
 		console.log($scope.application);
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

 	$scope.capitalizeFirstLetter = function(string) {

 		string = string.split(' ');

 		var returnedString = '';
 		angular.forEach(string, function(e,i) {
 			returnedString += e.charAt(0).toUpperCase() + e.slice(1) +' ';
 		});

 		return returnedString;
 	}

 	$scope.searchStudent = function(key) {
 		$scope.resultArray = [];
 		if (key ==''){
 			return;
 		}
 		angular.forEach($scope.allStudents,function(e,i){
 			var string = new RegExp(key,"i");
 			if(e.academic_id.search(string) >= 0){
 				$scope.resultArray.push(e);
 			}
 		});
 	}


 	$scope.selectStudent = function(v) {
 		$scope.application.student = v;
 		// $scope.application.student.name = $scope.capitalizeFirstLetter(v.first_name)+" "+$scope.capitalizeFirstLetter(v.last_name);
 		// $scope.application.student.academic_id = v.academic_id;
 		$scope.resultArray = [];
 		// console.log($scope.application.student);
 	}

 	$scope.saveApplication = function() {

 		if (!window.confirm('Confirm submission!')) {
 			return false;
 		};

 		$http.post('api/index.php/admin/student_completion_certificate',$scope.application)
 		.success(function(data) {
 			console.log(data);
 			// if (data.success === false) {
 			// }else{
 			// }
 			alert(data.message)
 		})
 		.error(function(data) {
 			console.log('http error occured!');
 			console.log(data);
 		});
 	}

 	$scope.print = function() {
 		window.print();
 	}

 	$scope.saveNPrint = function() {
 		$scope.saveApplication();
 		$scope.print();
 	}

 }]);
