'use strict';

/**
 * @ngdoc overview
 * @name SC-app-event
 * @description
 *
 * Provides the app with utilities that are used by lots of the other modules
 */
angular
  .module('SC-app-utils', [
    'angular.filter',
    'angularMoment',
    'angular-data.DSCacheFactory',
    'infinite-scroll',
    'duScroll'
  ]);