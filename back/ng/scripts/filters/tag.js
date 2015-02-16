'use strict';

/**
 * @ngdoc filter
 * @name ngApp.filter:tag
 * @function
 * @description
 * # tag
 * Filter in the ngApp.
 */
 angular.module('ngApp')
 .filter('tag', [function () {
 	return function (/*input*/) {
 		// console.log(input);
 		// var returnData = '';


 		// var allTags = JSON.parse('{"success":true,"data":[{"id_tags":"1","tag_name":"eee"},{"id_tags":"2","tag_name":"cse"},{"id_tags":"3","tag_name":"pdf"},{"id_tags":"4","tag_name":"book"},{"id_tags":"5","tag_name":"lecture"},{"id_tags":"6","tag_name":"ppt"},{"id_tags":"7","tag_name":"xls"},{"id_tags":"8","tag_name":"doc"},{"id_tags":"9","tag_name":"video"},{"id_tags":"10","tag_name":"audio"},{"id_tags":"11","tag_name":"zip"}]}');

 		// console.log(allTags);

 		// var getAllTags = function() {
 		// 	$http.get('api/file/get_all_tags')
 		// 	.success(function(data) {
   //               // console.log(data);
   //               if (data.success === true) {
   //               	allTags = data.data;
   //               	// searchTag();
   //               	console.log(allTags);
   //               }
   //           })
 		// 	.error(function(data) {
 		// 		console.log(data);
 		// 	});
 		// };

 		// if (input === '')
 		// 	getAllTags();
 		// else

 		// var searchTag = function() {
 		// 	if (allTags.data.length == 0) 
 		// 		returnData = 'No tag';

 		// 	angular.forEach(allTags.data, function(elm, idx) {
 		// 		if (elm.tag_name == input) {
 		// 			console.log(elm);
 		// 			returnData = angular.uppercase(elm.tag_name);
 		// 			// returnData = '<button type="button" class="btn btn-default">'+input+'</button>';
 		// 		}
 		// 	})
 		// }
 		// searchTag();

 		// return returnData;

 	};
 }]);
