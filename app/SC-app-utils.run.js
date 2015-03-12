'use strict';

angular
  .module('SC-app-utils')
  .run(function ($rootScope, $state, $window, $location, $http, DSCacheFactory, appConfig) {

    // Enable angular cache if app requires it
    if (appConfig.angularCache) {

      // Configure all $http requests to use a cache created by DSCacheFactory by default:
      new DSCacheFactory('defaultCache', {
          maxAge: 900000, // Items added to this cache expire after 15 minutes.
          cacheFlushInterval: 6000000, // This cache will clear itself every hour.
          deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
      });

      $http.defaults.cache = DSCacheFactory.get('defaultCache');

    }

    // Setup pageNotFound event
    $rootScope.$on('event:pageNotFound', function() {
      // Show 404 state
      $state.go('app.404');
    });

    // Setup serverError event
    $rootScope.$on('event:error', function() {
      // Show 500 state
      $state.go('app.error');
    });

    // Broadcast pageNotFound if stateChangeError
    // Includes when path doesn't match any state
    $rootScope.$on('$stateChangeError', function() {
      $rootScope.$broadcast('event:pageNotFound');
    });

    // Setup Google Tag Manager
    // Scroll to top when state changes
    $rootScope.$on('$stateChangeSuccess', function() {
      $window.scrollTo(0,0);

      // Get virtual url for Google Tag Manager pageview
      var virtualUrl = $location.path();

      // Push url to GTM dataLayer
      $window.dataLayer.push({
        event: 'pageview',
        virtualUrl: virtualUrl
      });

    });

  });

