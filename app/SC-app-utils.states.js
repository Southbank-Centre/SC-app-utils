'use strict';

angular.module('SC-app-utils').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    // If no path after hostname, add a slash, which redirects to home state
    $urlRouterProvider.when('', '/');

    // If no matching state is found, default to 404 state
    $urlRouterProvider.otherwise('/404');

    // Enable HTML5 mode to remove # from URL in browsers that support history API
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('app.error', {
        views: {
          '@': {
            template: '<h2 style="padding:20px">We&apos;re undergoing maintenance at the moment. Please check back a bit later.</h2>'
          }
        }
      })
      .state('app.404', {
        url: '/404',
        views: {
          '@': {
            template: '<h1 style="padding-left:20px">Page not found.</h1>'
          }
        }
      });

  });