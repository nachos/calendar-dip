'use strict';

angular.module('calendarApp')
  .controller('Calendar', function ($scope, $timeout) {
    var gcal = require('google-calendar');
    var calendar;
    var nachosApi = require('nachos-api');
    var client = nachosApi.server;
    var _ = require('lodash');
    var Q = require('q');
    var moment = require('moment');

    var format = 'YYYY-MM-DDTHH:mm:ssZ';
    var timeMin = moment().format(format);
    var timeMax = moment().add(14, 'days').format(format);

    client.users.me()
      .then(function (user) {
        var token = user.providers.google.token;
        return new gcal.GoogleCalendar(token);
      })
      .then(function (calendar) {
        return Q.nfcall(calendar.calendarList.list.bind(calendar))
          .then(function (calendars) {
            var ids = _.pluck(calendars.items, 'id');

            var promises = _.map(ids, function (calendarId) {
              return Q.nfcall(calendar.events.list.bind(calendar), calendarId, { timeMin: timeMin, timeMax: timeMax  })
                .then(function (calendarEvents) {
                  return calendarEvents.items;
                });
            });

            return Q.all(promises);
          })
          .then(function (events) {
            return _.flattenDeep(events);
          });
      })
      .then(function (events) {
        $timeout(function () {
          $scope.events = events;
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });
