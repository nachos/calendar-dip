'use strict';
angular.module('calendarApp', ['ngMaterial', 'ui.router'])
  .config(function($urlRouterProvider, $mdThemingProvider){
    $urlRouterProvider
      .otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('lime');
  });