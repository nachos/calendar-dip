'use strict';

angular.module('calendarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        controller: 'Settings',
        templateUrl: 'client/app/settings/settings.html'
      });
  });
