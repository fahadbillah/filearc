'use strict';

/**
 * @ngdoc directive
 * @name ngApp.directive:tags
 * @description
 * # tags
 */
 angular.module('ngApp')
 .directive('tags', [function () {
 	return {
 		template: '<button type="button" class="btn btn-primary">Tags</button>',
 		restrict: 'E'
 	};
 }])
 .directive('ngEnter', function () {
 	return function (scope, element, attrs) {
 		element.bind('keydown keypress', function (event) {
 			if(event.which === 13) {
 				scope.$apply(function (){
 					scope.$eval(attrs.ngEnter);
 				});
 				
 				event.preventDefault();
 			}
 		});
 	};
 })
 .directive('navs', ['$http', function($http) {
 	return {
 		restrict: 'E',
 		templateUrl: 'views/navs.html',
 		link: function (scope) {
 			scope.$on('$routeChangeSuccess', function() { 
 				var needRedirect = true;
 				var currentUrl = window.location.hash.split('/')[window.location.hash.split('/').length-2];
 				switch(currentUrl) {
 					case 'success':
 					case 'activateuser':
 					case 'updatePassword':
 					needRedirect = false;
 					break;
 					default:
 					needRedirect = true;
 				}

 				scope.logoLink = '';
 				$http.get('api/index.php/auth/is_logged_in')
 				.success(function(data) {
 					console.log(data);
 					if (data.success === false) {
 						scope.links = [
 						{
 							url: '#/auth',
 							title: 'Login',
 							class: ''
 						}
 						];
 						scope.logoLink = '#/auth';
 						if (data.action.actionName === 'redirect' && needRedirect ) {
 							window.location.replace(data.action.url);
 						}
 					}else{
 						if (data.user_type === 'admin') {

 							scope.links = [
 							{
 								url: '#/adminpanel',
 								title: 'Home',
 								class: ''
 							},
 							{
 								url: '#/officeInfo',
 								title: 'Office',
 								class: ''
 							},
 							{
 								url: '#/logout',
 								title: 'Log Out',
 								class: ''
 							},
 							];
 							scope.logoLink = '#/adminpanel';

 						} else if(data.user_type === 'faculty') {

 							scope.links = [
 							{
 								url: '#/',
 								title: 'Home',
 								class: ''
 							},
 							{
 								url: '#/facultyApplication',
 								title: 'Application',
 								class: ''
 							},
 							{
 								url: '#/uploader',
 								title: 'Upload',
 								class: ''
 							},
 							{
 								url: '#/profile',
 								title: 'Profile',
 								class: ''
 							},
 							{
 								url: '#/favorites',
 								title: 'Favorites',
 								class: ''
 							},
 							{
 								url: '#/logout',
 								title: 'Log Out',
 								class: ''
 							},
 							];
 							scope.logoLink = '#/';

 						} else{

 							scope.links = [
 							{
 								url: '#/',
 								title: 'Home',
 								class: ''
 							},
 							{
 								url: '#/uploader',
 								title: 'Upload',
 								class: ''
 							},
 							{
 								url: '#/profile',
 								title: 'Profile',
 								class: ''
 							},
 							{
 								url: '#/favorites',
 								title: 'Favorites',
 								class: ''
 							},
 							{
 								url: '#/logout',
 								title: 'Log Out',
 								class: ''
 							},
 							];
 							scope.logoLink = '#/';

 						};



 					}
 					angular.forEach(scope.links, function(elm) {
 						if (elm.url === window.location.hash) {
 							elm.class = 'active';
 						}
 					});
 				})
.error(function(data) {
	console.log(data);
});
});

}
};
}])
.directive('favorite', [function () {
	return {
		restrict: 'E',
		templateUrl: 'views/favoritebutton.html',
	};
}])
.directive('like', ['$http','$routeParams', function ($http,$routeParams) {
	return {
		restrict: 'E',
		templateUrl: 'views/likebutton.html',
		link: function (scope, elem, iAttrs) {
			scope.likeClass = '';
			elem.bind('click', function() {
				console.log($routeParams.fileId);

				$http.get('api/index.php/file/toggle_like/'+$routeParams.fileId )
				.success(function(data) {
					console.log(data);
					if (data.success === true) {
						if (data.action.actionName == 'toggleLike' && data.action.value == true) {
							scope.likeClass = 'like';
						}else{
							scope.likeClass = 'unlike';
						}
						scope.file.total_liked = data.total_liked;
					}
				})
				.error(function(data) {
					console.log(data);
				});
			});
		}
	};
}]);