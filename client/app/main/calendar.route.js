'use strict';

angular.module('calendarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'Calendar',
        templateUrl: 'client/app/main/calendar.html'
      });
  });
