'use strict';

/**
 * @ngdoc overview
 * @name ngApp
 * @description
 * # ngApp
 *
 * Main module of the application.
 */
 angular
 .module('ngApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'angularFileUpload'
  ])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/auth', {
    templateUrl: 'views/auth.html',
    controller: 'AuthCtrl'
  })
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/success/:successId', {
    templateUrl: 'views/success.html',
    controller: 'SuccessCtrl'
  })
  .when('/uploader', {
    templateUrl: 'views/uploader.html',
    controller: 'UploaderCtrl'
  })
  .when('/logout', {
    templateUrl: 'views/logout.html',
    controller: 'LogoutCtrl'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  })
  .when('/filedetails/:fileId', {
    templateUrl: 'views/filedetails.html',
    controller: 'FiledetailsCtrl'
  })
  .when('/favorites', {
    templateUrl: 'views/favorites.html',
    controller: 'FavoritesCtrl'
  })
  .when('/activateuser/:activationCode', {
    templateUrl: 'views/activateuser.html',
    controller: 'ActivateuserCtrl'
  })
  .when('/adminpanel', {
    templateUrl: 'views/adminpanel.html',
    controller: 'AdminpanelCtrl'
  })
  .otherwise({
    redirectTo: '/auth'
  });
});
