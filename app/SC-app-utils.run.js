'use strict';

angular
  .module('SC-app-utils')
  .run(function ($rootScope, $state, $window, $location, $http, CacheFactory, appConfig) {

    // Enable angular cache if app requires it
    if (appConfig.angularCache) {

      // Configure all $http requests to use a cache created by DSCacheFactory by default:
      new CacheFactory('defaultCache', {
          maxAge: 900000, // Items added to this cache expire after 15 minutes.
          cacheFlushInterval: 6000000, // This cache will clear itself every hour.
          deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
      });

      $http.defaults.cache = CacheFactory.get('defaultCache');

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

    // Set boolean for when a pageview event has been sent to GA
    $rootScope.gaPageViewOnStateChange = false;

    $rootScope.$on('$stateChangeSuccess', function() {

      // Scroll to top when state changes
      $window.scrollTo(0,0);

      // Get virtual url for Google Tag Manager pageview
      var virtualUrl = $location.path();

      // Push url to GTM dataLayer
      $window.dataLayer.push({
        event: 'pageview',
        virtualUrl: virtualUrl
      });

      // console.log('pageview sent');
      $rootScope.gaPageViewOnStateChange = true;

    });

  });

