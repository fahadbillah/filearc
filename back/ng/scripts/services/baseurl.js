'use strict';

/**
 * @ngdoc service
 * @name ngApp.baseURL
 * @description
 * # baseURL
 * Value in the ngApp.
 */
 angular.module('ngApp')
 .value('baseURL', window.location.origin+window.location.pathname);
