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
 		link: function (scope /*, iElement, iAttrs*/) {
 			scope.$on('$routeChangeSuccess', function(/*next, current*/) { 
 				scope.logoLink = '';
 				$http.get('api/auth/is_logged_in')
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
 						if (data.action.actionName === 'redirect') {
 							window.location.replace(data.action.url);
 						}
 					}else{
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
 					}
 					angular.forEach(scope.links, function(elm/*,idx*/) {
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
		// link: function (scope, iElement, iAttrs) {
		// 	// scope.$on('click', function() {
		// 	// 	console.log('wowowowwo');
		// 	// })
		// }
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

				$http.get('api/file/toggle_like/'+$routeParams.fileId )
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


				// var src = elem.find('img').attr('src');

        		// call your SmoothZoom here
        		// angular.element(attrs.options).css({'background-image':'url('+ scope.item.src +')'});
        	});
		}
	};
}]);
/*,
link: function postLink(scope, element, attrs) {
	element.text('this is the tags directive');
}*/