'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:OfficeinfoCtrl
 * @description
 * # OfficeinfoCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('OfficeinfoCtrl', ['$scope','$http','$filter', function ($scope,$http,$filter) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	$scope.clicked = false;
 	$scope.allAdditionalInfo = [];

 	$scope.addNewInfo = function() {
 		console.log($scope.newAdditionalInfo);

 		$scope.newAdditionalInfo.name = $scope.newAdditionalInfo.name.trim();
 		$scope.newAdditionalInfo.value = $scope.newAdditionalInfo.value.trim();

 		$http.post('api/index.php/admin/insert_additional_info', $scope.newAdditionalInfo)
 		.success(function(data) {
 			loadAdditionalInfo();
 			console.log(data);
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	};

 	var loadAdditionalInfo = function() {
 		$http.get('api/index.php/admin/get_all_additional_info')
 		.success(function(data) {
 			if(data.success === true){
 				$scope.allAdditionalInfo = data.data;
 				$scope.clear();
 			}else{
 			}
 			console.log(data);
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	}

 	loadAdditionalInfo();

 	$scope.newAdditionalInfo = {
 		id: '',
 		name: '',
 		value: ''
 	};


 	$scope.edit = function(idx) {
 		$scope.newAdditionalInfo.id = $scope.allAdditionalInfo[idx].id_additional_info;
 		$scope.newAdditionalInfo.name = $scope.allAdditionalInfo[idx].additional_info_name;
 		// $scope.newAdditionalInfo.name = $filter('camelCaseToTitle')($scope.allAdditionalInfo[idx].additional_info_name);
 		$scope.newAdditionalInfo.value = $scope.allAdditionalInfo[idx].additional_info_value;
 	}


 	$scope.clear = function() {
 		$scope.newAdditionalInfo = {
 			id: '',
 			name: '',
 			value: ''
 		};
 		$scope.additionalInfoForm.$setPristine();
 	}
 }]);
